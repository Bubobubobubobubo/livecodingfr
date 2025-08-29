import { EditorView } from 'codemirror';
import { EditorState, Prec } from '@codemirror/state';
import { basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { keymap } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';

const customTheme = EditorView.theme({
  "&": {
    height: "200px",
    fontSize: "14px",
    backgroundColor: "#262626",
    border: "1px solid #1f2937"
  },
  ".cm-content": {
    caretColor: "#fb923c",
    fontFamily: "monospace",
    padding: "10px",
    color: "#ffffff"
  },
  ".cm-focused .cm-cursor": {
    borderLeftColor: "#fb923c"
  },
  ".cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
    backgroundColor: "#fb923c33 !important"
  },
  ".cm-activeLine": {
    backgroundColor: "#17171722"
  },
  ".cm-gutters": {
    backgroundColor: "#171717",
    color: "#9ca3af",
    border: "none",
    borderRight: "1px solid #1f2937"
  },
  ".cm-activeLineGutter": {
    backgroundColor: "#262626",
    color: "#fb923c"
  },
  ".cm-lineNumbers": {
    minWidth: "3rem"
  },
  ".cm-line": {
    padding: "0 2px 0 6px"
  },
  ".cm-foldGutter": {
    color: "#9ca3af"
  },
  "&.cm-focused .cm-matchingBracket": {
    backgroundColor: "#fb923c33",
    outline: "1px solid #fb923c"
  }
}, {dark: true});

const highlightStyle = HighlightStyle.define([
  {tag: tags.keyword, color: "#fb923c", fontWeight: "bold"},
  {tag: tags.controlKeyword, color: "#fb923c", fontWeight: "bold"},
  {tag: tags.operatorKeyword, color: "#fb923c"},
  {tag: tags.operator, color: "#fb923c"},
  {tag: tags.punctuation, color: "#9ca3af"},
  {tag: tags.separator, color: "#9ca3af"},
  {tag: tags.bracket, color: "#9ca3af"},
  {tag: tags.variableName, color: "#ffffff"},
  {tag: tags.function(tags.variableName), color: "#fdba74"},
  {tag: tags.propertyName, color: "#60a5fa"},
  {tag: tags.string, color: "#86efac"},
  {tag: tags.number, color: "#c084fc"},
  {tag: tags.bool, color: "#c084fc", fontWeight: "bold"},
  {tag: tags.null, color: "#c084fc", fontWeight: "bold"},
  {tag: tags.regexp, color: "#fbbf24"},
  {tag: tags.comment, color: "#6b7280", fontStyle: "italic"},
  {tag: tags.lineComment, color: "#6b7280", fontStyle: "italic"},
  {tag: tags.blockComment, color: "#6b7280", fontStyle: "italic"},
  {tag: tags.typeName, color: "#fdba74", fontWeight: "bold"},
  {tag: tags.className, color: "#fdba74", fontWeight: "bold"},
  {tag: tags.self, color: "#fb923c", fontWeight: "bold"},
  {tag: tags.meta, color: "#9ca3af", fontStyle: "italic"},
  {tag: tags.emphasis, fontStyle: "italic"},
  {tag: tags.strong, fontWeight: "bold"}
]);

const defaultCode = `// JavaScript REPL with Audio Clock & Sequencer - Press Ctrl+Enter (Cmd+Enter on Mac) to run
// NEW: Schedule on multiple beats with arrays! schedule('name', [0, 2, 4], callback)

// Set pattern length to 16 beats
cycle(16);

// Drum pattern using arrays - much cleaner!
schedule('kick', [0, 8], () => sine(60, 0.2).distort(0.2).vel(1));
schedule('snare', [4, 12], () => sine(200, 0.05).reverb(0.3, 0.4));
schedule('hihat', [0, 2, 4, 6, 8, 10, 12, 14], () => sine(8000, 0.02).highpass(5000));

// Melodic pattern - play chord progression
const Cmaj = [261, 329, 392]; // C E G
const Gmaj = [392, 493, 587]; // G B D
schedule('chord-C', [0, 4], () => {
  Cmaj.forEach(f => sine(f, 0.5).lowpass(800).reverb());
});
schedule('chord-G', [8, 12], () => {
  Gmaj.forEach(f => sine(f, 0.5).lowpass(800).reverb());
});

// Bass line with array scheduling
schedule('bass', [0, 3, 6, 8, 11, 14], () => tri(55, 0.3).distort(0.3).lowpass(500));

// Euclidean rhythm pattern E(5,8) for interesting grooves
schedule('euclidean', [0, 2, 4, 5, 7], () => saw(440, 0.1).delay(0.1, 0.5));

// Polyrhythm: 3 against 4
schedule('poly3', [0, 5.33, 10.66], () => sine(880, 0.05));
schedule('poly4', [0, 4, 8, 12], () => sine(660, 0.05));

// You can still use single beats
schedule('accent', 0, () => sine(1760, 0.02).vel(1));

console.log("Pattern ready! Events:", listScheduled().length);`;

export function createExecuteKeymap(executeCode) {
  return Prec.high(keymap.of([{
    key: "Mod-Enter",
    run: (view) => {
      executeCode();
      return true;
    }
  }]));
}

export function createEditor(container, executeCode) {
  const executeKeymap = createExecuteKeymap(executeCode);
  
  const startState = EditorState.create({
    doc: defaultCode,
    extensions: [
      executeKeymap,
      basicSetup,
      javascript(),
      customTheme,
      syntaxHighlighting(highlightStyle),
      EditorView.lineWrapping
    ]
  });

  return new EditorView({
    state: startState,
    parent: container
  });
}