<script>
  import { onMount } from 'svelte';
  import { EditorView, basicSetup } from 'codemirror';
  import { EditorState, Prec } from '@codemirror/state';
  import { javascript } from '@codemirror/lang-javascript';
  import { keymap } from '@codemirror/view';
  import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
  import { tags } from '@lezer/highlight';
  import { clock } from '$lib/audioClock.js';
  import { sequencer } from '$lib/sequencer.js';
  import * as Tone from 'tone';
  
  let editorContainer;
  let view;
  let outputs = [];
  let errorMessage = '';
  let clockStarted = false;
  let clockStatus = '⏸ Clock not started';
  let editorReady = false;

  // Custom theme matching website colors
  const customTheme = EditorView.theme({
    "&": {
      height: "200px",
      fontSize: "14px",
      backgroundColor: "#262626", // neutral-800
      border: "1px solid #1f2937" // gray-800
    },
    ".cm-content": {
      caretColor: "#fb923c", // orange-400
      fontFamily: "monospace",
      padding: "10px",
      color: "#ffffff" // white text
    },
    ".cm-focused .cm-cursor": {
      borderLeftColor: "#fb923c" // orange-400
    },
    ".cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
      backgroundColor: "#fb923c33 !important" // orange-400 with transparency
    },
    ".cm-activeLine": {
      backgroundColor: "#17171722" // neutral-900 with transparency
    },
    ".cm-gutters": {
      backgroundColor: "#171717", // neutral-900
      color: "#9ca3af", // gray-400
      border: "none",
      borderRight: "1px solid #1f2937" // gray-800
    },
    ".cm-activeLineGutter": {
      backgroundColor: "#262626", // neutral-800
      color: "#fb923c" // orange-400
    },
    ".cm-lineNumbers": {
      minWidth: "3rem"
    },
    ".cm-line": {
      padding: "0 2px 0 6px"
    },
    ".cm-foldGutter": {
      color: "#9ca3af" // gray-400
    },
    "&.cm-focused .cm-matchingBracket": {
      backgroundColor: "#fb923c33",
      outline: "1px solid #fb923c"
    }
  }, {dark: true});

  // Custom syntax highlighting using Lezer
  const highlightStyle = HighlightStyle.define([
    // Keywords
    {tag: tags.keyword, color: "#fb923c", fontWeight: "bold"}, // orange-400
    {tag: tags.controlKeyword, color: "#fb923c", fontWeight: "bold"}, // if, else, for
    {tag: tags.operatorKeyword, color: "#fb923c"}, // typeof, instanceof
    
    // Operators and punctuation
    {tag: tags.operator, color: "#fb923c"}, // orange-400
    {tag: tags.punctuation, color: "#9ca3af"}, // gray-400
    {tag: tags.separator, color: "#9ca3af"},
    {tag: tags.bracket, color: "#9ca3af"},
    
    // Variables and functions
    {tag: tags.variableName, color: "#ffffff"}, // white
    {tag: tags.function(tags.variableName), color: "#fdba74"}, // function calls
    {tag: tags.propertyName, color: "#60a5fa"}, // blue-400
    
    // Literals
    {tag: tags.string, color: "#86efac"}, // green-300
    {tag: tags.number, color: "#c084fc"}, // purple-400
    {tag: tags.bool, color: "#c084fc", fontWeight: "bold"},
    {tag: tags.null, color: "#c084fc", fontWeight: "bold"},
    {tag: tags.regexp, color: "#fbbf24"}, // yellow-400
    
    // Comments
    {tag: tags.comment, color: "#6b7280", fontStyle: "italic"}, // gray-500
    {tag: tags.lineComment, color: "#6b7280", fontStyle: "italic"},
    {tag: tags.blockComment, color: "#6b7280", fontStyle: "italic"},
    
    // Types and classes
    {tag: tags.typeName, color: "#fdba74", fontWeight: "bold"}, // orange-300
    {tag: tags.className, color: "#fdba74", fontWeight: "bold"},
    
    // Special
    {tag: tags.self, color: "#fb923c", fontWeight: "bold"}, // this
    {tag: tags.meta, color: "#9ca3af", fontStyle: "italic"},
    
    // Text formatting
    {tag: tags.emphasis, fontStyle: "italic"},
    {tag: tags.strong, fontWeight: "bold"}
  ]);

  async function startAudioClock() {
    try {
      await Tone.start();
      await clock.init();
      await clock.start();
      sequencer.initSynthPool();
      clockStarted = true;
      
      // Update status on time updates
      clock.on('timeUpdate', (data) => {
        const time = data.time.toFixed(2);
        const ticks = clock.ticks();
        clockStatus = `▶ Time: ${time}s | Ticks: ${ticks} | BPM: ${clock.bpm()}`;
      });
      
      // Now initialize the editor
      editorReady = true;
      await initializeEditor();
    } catch (error) {
      console.error('Failed to start audio clock:', error);
    }
  }

  function executeCode() {
    errorMessage = '';
    outputs = [];
    const code = view.state.doc.toString();
    
    try {
      const originalConsole = {
        log: console.log,
        error: console.error,
        warn: console.warn,
        info: console.info,
        debug: console.debug
      };
      
      const formatArgs = (args) => {
        return args.map(arg => {
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg, null, 2);
            } catch {
              return String(arg);
            }
          }
          return String(arg);
        }).join(' ');
      };
      
      console.log = (...args) => {
        outputs.push({ type: 'log', message: formatArgs(args) });
        originalConsole.log(...args);
      };
      
      console.error = (...args) => {
        outputs.push({ type: 'error', message: formatArgs(args) });
        originalConsole.error(...args);
      };
      
      console.warn = (...args) => {
        outputs.push({ type: 'warn', message: formatArgs(args) });
        originalConsole.warn(...args);
      };
      
      console.info = (...args) => {
        outputs.push({ type: 'info', message: formatArgs(args) });
        originalConsole.info(...args);
      };
      
      console.debug = (...args) => {
        outputs.push({ type: 'debug', message: formatArgs(args) });
        originalConsole.debug(...args);
      };

      // Create execution context with clock and sequencer functions
      const executionContext = `
        const time = () => clock.time();
        const bpm = () => clock.bpm();
        const ticks = () => clock.ticks();
        const setBPM = (value) => clock.setBPM(value);
        const stopClock = () => clock.stop();
        const startClock = () => clock.start();
        const isRunning = () => clock.running();
        
        const cycle = sequencer.cycle;
        const schedule = sequencer.schedule;
        const clearSchedule = sequencer.clearSchedule;
        const sine = sequencer.sine;
        const saw = sequencer.saw;
        const square = sequencer.square;
        const tri = sequencer.tri;
        const listScheduled = sequencer.listScheduled;
        
        ${code}
      `;

      const result = eval(executionContext);
      
      Object.assign(console, originalConsole);
      
      if (outputs.length === 0 && result !== undefined) {
        outputs.push({ type: 'return', message: String(result) });
      }
    } catch (error) {
      errorMessage = error.toString();
    }
  }

  const executeKeymap = Prec.high(keymap.of([{
    key: "Mod-Enter",
    run: (view) => {
      executeCode();
      return true;
    }
  }]));

  async function initializeEditor() {
    // Small delay to ensure DOM is ready
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (!editorContainer) return;
    
    const startState = EditorState.create({
      doc: `// JavaScript REPL with Audio Clock & Sequencer - Press Ctrl+Enter (Cmd+Enter on Mac) to run
// Synths auto-play in schedule context: sine(), saw(), square(), tri()
// No need for .play() - just write the sound!

// Set pattern length to 8 beats
cycle(8);

// Super simple syntax - synths auto-play!
schedule('kick', 0, () => sine(60, 0.2).vel(1));
schedule('snare', 4, () => sine(200, 0.05));

// Hi-hat pattern - just freq and duration
schedule('hat1', 2, () => sine(8000, 0.02));
schedule('hat2', 6, () => sine(8000, 0.02));

// Different waveforms
schedule('melody', 1, () => saw(440, 0.3));
schedule('melody2', 5, () => square(659, 0.3));

// Bass line with triangle wave
schedule('bass', 3, () => tri(110, 0.4));
schedule('bass2', 7, () => tri(82.5, 0.4));

// You can still chain methods if needed
schedule('lead', 0, () => sine(880).dur(0.1).vel(0.5));

// Redefine on the fly
schedule('kick', 0, () => sine(80, 0.15));

console.log("Pattern ready! BPM:", bpm());`,
      extensions: [
        executeKeymap,
        basicSetup,
        javascript(),
        customTheme,
        syntaxHighlighting(highlightStyle),
        EditorView.lineWrapping
      ]
    });

    view = new EditorView({
      state: startState,
      parent: editorContainer
    });
  }

  onMount(() => {
    return () => {
      if (view) {
        view.destroy();
      }
    };
  });
</script>

<div class="repl-container bg-neutral-900 border border-gray-800 p-4 my-4 relative">
  {#if !editorReady}
    <div class="start-overlay">
      <h2 class="text-2xl font-bold text-orange-400 mb-4">Démarrer l'horloge audio</h2>
      <p class="text-gray-300 mb-6">
        Ce REPL utilise une horloge audio haute précision pour la synchronisation.<br>
        Cliquez ci-dessous pour démarrer le contexte audio et initialiser l'éditeur.
      </p>
      <button
        on:click={startAudioClock}
        class="px-6 py-2 bg-orange-400 text-black font-semibold uppercase tracking-wider hover:bg-orange-300 transition-colors"
      >
        Démarrer l'horloge
      </button>
    </div>
  {:else}
    {#if clockStarted}
      <div class="clock-status text-xs text-orange-400 font-mono mb-2">
        {clockStatus}
      </div>
    {/if}
    <div class="mb-2">
      <div class="flex gap-2">
        <div class="flex-1" bind:this={editorContainer}></div>
        <button
          on:click={executeCode}
          class="px-4 bg-neutral-800 text-orange-400 border border-gray-800 hover:border-orange-400 hover:bg-neutral-800 transition-all duration-200 text-sm font-semibold uppercase tracking-wider h-[200px]"
        >
          Run<br/>(Ctrl/Cmd+Enter)
        </button>
      </div>
    </div>
    
    {#if outputs.length > 0 || errorMessage}
      <div class="output-container">
        <div class="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-1">Console:</div>
        <div class="bg-neutral-800 p-2">
          {#each outputs as output}
            <div class="console-line mb-1">
              {#if output.type === 'log'}
                <pre class="text-sm overflow-x-auto no-scrollbar"><code class="text-gray-200">{output.message}</code></pre>
              {:else if output.type === 'error'}
                <pre class="text-sm overflow-x-auto no-scrollbar"><code class="text-red-400">✖ {output.message}</code></pre>
              {:else if output.type === 'warn'}
                <pre class="text-sm overflow-x-auto no-scrollbar"><code class="text-yellow-400">⚠ {output.message}</code></pre>
              {:else if output.type === 'info'}
                <pre class="text-sm overflow-x-auto no-scrollbar"><code class="text-blue-400">ℹ {output.message}</code></pre>
              {:else if output.type === 'debug'}
                <pre class="text-sm overflow-x-auto no-scrollbar"><code class="text-gray-500">{output.message}</code></pre>
              {:else if output.type === 'return'}
                <pre class="text-sm overflow-x-auto no-scrollbar"><code class="text-green-400">← {output.message}</code></pre>
              {/if}
            </div>
          {/each}
          
          {#if errorMessage}
            <div class="console-line">
              <pre class="text-sm overflow-x-auto no-scrollbar"><code class="text-red-500">✖ Uncaught {errorMessage}</code></pre>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  :global(.cm-editor) {
    font-family: 'IBM Plex Mono', 'Courier New', monospace;
  }
  
  :global(.cm-editor.cm-focused) {
    outline: none;
  }
  
  :global(.cm-scroller) {
    font-family: inherit;
  }
  
  .clock-status {
    padding: 4px 8px;
    background: rgba(251, 146, 60, 0.1);
    border: 1px solid rgba(251, 146, 60, 0.3);
    display: inline-block;
  }
  
  .start-overlay {
    min-height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
  }
</style>