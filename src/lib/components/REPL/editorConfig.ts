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

const defaultCode = `// JavaScript REPL with Audio Clock & Sequencer - Press Ctrl+Enter (Cmd+Enter on Mac) to run`;

export function createExecuteKeymap(executeCode: () => void) {
  return Prec.high(keymap.of([{
    key: "Mod-Enter",
    run: (view: EditorView) => {
      executeCode();
      return true;
    }
  }]));
}

export function createEditor(container: HTMLElement, executeCode: () => void): EditorView {
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