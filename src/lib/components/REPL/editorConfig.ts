import { EditorView } from 'codemirror';
import { EditorState, Prec } from '@codemirror/state';
import { basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { keymap } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { CodeHistory } from './codeHistory';
import { AutoSave } from './autoSave';

const customTheme = EditorView.theme({
  "&": {
    height: "200px",
    fontSize: "14px",
    backgroundColor: "rgb(var(--color-bg-secondary))",
    border: "1px solid rgb(var(--color-border-primary))"
  },
  ".cm-content": {
    caretColor: "rgb(var(--color-accent-primary))",
    fontFamily: "monospace",
    padding: "10px",
    color: "rgb(var(--color-text-primary))"
  },
  ".cm-focused .cm-cursor": {
    borderLeftColor: "rgb(var(--color-accent-primary))"
  },
  ".cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
    backgroundColor: "rgba(var(--color-accent-primary), 0.2) !important"
  },
  ".cm-activeLine": {
    backgroundColor: "rgba(var(--color-bg-tertiary), 0.5)"
  },
  ".cm-gutters": {
    backgroundColor: "rgb(var(--color-bg-tertiary))",
    color: "rgb(var(--color-text-muted))",
    border: "none",
    borderRight: "1px solid rgb(var(--color-border-primary))"
  },
  ".cm-activeLineGutter": {
    backgroundColor: "rgb(var(--color-bg-secondary))",
    color: "rgb(var(--color-accent-primary))"
  },
  ".cm-lineNumbers": {
    minWidth: "3rem"
  },
  ".cm-line": {
    padding: "0 2px 0 6px"
  },
  ".cm-foldGutter": {
    color: "rgb(var(--color-text-muted))"
  },
  "&.cm-focused .cm-matchingBracket": {
    backgroundColor: "rgba(var(--color-accent-primary), 0.2)",
    outline: "1px solid rgb(var(--color-accent-primary))"
  }
}, {dark: true});

// Create a function to get CSS variable values
function getCSSVariable(name: string): string {
  if (typeof document !== 'undefined') {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name);
    return value ? `rgb(${value})` : '#ffffff';
  }
  return '#ffffff';
}

const highlightStyle = HighlightStyle.define([
  {tag: tags.keyword, color: "rgb(var(--color-accent-primary))", fontWeight: "bold"},
  {tag: tags.controlKeyword, color: "rgb(var(--color-accent-primary))", fontWeight: "bold"},
  {tag: tags.operatorKeyword, color: "rgb(var(--color-accent-primary))"},
  {tag: tags.operator, color: "rgb(var(--color-accent-primary))"},
  {tag: tags.punctuation, color: "rgb(var(--color-text-muted))"},
  {tag: tags.separator, color: "rgb(var(--color-text-muted))"},
  {tag: tags.bracket, color: "rgb(var(--color-text-muted))"},
  {tag: tags.variableName, color: "rgb(var(--color-text-primary))"},
  {tag: tags.function(tags.variableName), color: "rgb(var(--color-accent-secondary))"},
  {tag: tags.propertyName, color: "rgb(var(--color-accent-tertiary))"},
  {tag: tags.string, color: "rgb(var(--color-accent-secondary))"},
  {tag: tags.number, color: "rgb(var(--color-accent-tertiary))"},
  {tag: tags.bool, color: "rgb(var(--color-accent-tertiary))", fontWeight: "bold"},
  {tag: tags.null, color: "rgb(var(--color-accent-tertiary))", fontWeight: "bold"},
  {tag: tags.regexp, color: "rgb(var(--color-accent-primary))"},
  {tag: tags.comment, color: "rgb(var(--color-text-muted))", fontStyle: "italic"},
  {tag: tags.lineComment, color: "rgb(var(--color-text-muted))", fontStyle: "italic"},
  {tag: tags.blockComment, color: "rgb(var(--color-text-muted))", fontStyle: "italic"},
  {tag: tags.typeName, color: "rgb(var(--color-accent-secondary))", fontWeight: "bold"},
  {tag: tags.className, color: "rgb(var(--color-accent-secondary))", fontWeight: "bold"},
  {tag: tags.self, color: "rgb(var(--color-accent-primary))", fontWeight: "bold"},
  {tag: tags.meta, color: "rgb(var(--color-text-muted))", fontStyle: "italic"},
  {tag: tags.emphasis, fontStyle: "italic"},
  {tag: tags.strong, fontWeight: "bold"}
]);

const defaultCode = `// JavaScript REPL with Audio Clock & Sequencer - Press Ctrl+Enter (Cmd+Enter on Mac) to run`;

/**
 * Creates a keymap extension for executing code with Mod-Enter and history navigation
 * @param executeCode - Function to call when the execute key combination is pressed
 * @param codeHistory - CodeHistory instance for navigation
 * @returns CodeMirror extension for handling execute keymap and history
 */
export function createExecuteKeymap(executeCode: () => void, codeHistory: CodeHistory) {
  return Prec.high(keymap.of([
    {
      key: "Mod-Enter",
      run: (view: EditorView) => {
        const code = view.state.doc.toString();
        codeHistory.addToHistory(code);
        executeCode();
        return true;
      }
    },
    {
      key: "Ctrl-ArrowUp",
      run: (view: EditorView) => {
        const prevCode = codeHistory.getPrevious();
        if (prevCode) {
          view.dispatch({
            changes: { from: 0, to: view.state.doc.length, insert: prevCode },
            selection: { anchor: prevCode.length }
          });
        }
        return true;
      }
    },
    {
      key: "Ctrl-ArrowDown", 
      run: (view: EditorView) => {
        const nextCode = codeHistory.getNext();
        if (nextCode) {
          view.dispatch({
            changes: { from: 0, to: view.state.doc.length, insert: nextCode },
            selection: { anchor: nextCode.length }
          });
        } else {
          // Reset to empty if at end of history
          codeHistory.resetNavigation();
          view.dispatch({
            changes: { from: 0, to: view.state.doc.length, insert: "" },
            selection: { anchor: 0 }
          });
        }
        return true;
      }
    }
  ]));
}

/**
 * Creates a configured CodeMirror editor instance with JavaScript support and custom theme
 * @param container - DOM element to attach the editor to
 * @param executeCode - Function to call when code execution is triggered
 * @returns Object containing configured CodeMirror EditorView instance, CodeHistory, and AutoSave
 */
export function createEditor(container: HTMLElement, executeCode: () => void): { view: EditorView; history: CodeHistory; autoSave: AutoSave } {
  const codeHistory = new CodeHistory();
  const autoSave = new AutoSave();
  const executeKeymap = createExecuteKeymap(executeCode, codeHistory);
  
  // Try to load saved code, fallback to default
  const savedCode = autoSave.loadCode();
  const initialCode = savedCode || defaultCode;
  
  const startState = EditorState.create({
    doc: initialCode,
    extensions: [
      executeKeymap,
      basicSetup,
      javascript(),
      customTheme,
      syntaxHighlighting(highlightStyle),
      EditorView.lineWrapping,
      // Auto-save on document changes
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          const currentCode = update.state.doc.toString();
          autoSave.saveCode(currentCode);
        }
      })
    ]
  });

  const view = new EditorView({
    state: startState,
    parent: container
  });

  return { view, history: codeHistory, autoSave };
}