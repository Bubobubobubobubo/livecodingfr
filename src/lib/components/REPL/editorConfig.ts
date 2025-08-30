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