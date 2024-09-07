import { Editor } from "@monaco-editor/react";
import { useRef } from "react";
import { Button } from "../ui/button";

export default function EditorCom({ getValue, data }) {
  const editorRef = useRef();

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const outputHandler = () => {
    const value = editorRef.current.getValue();
    getValue(value);
  };
  

  return (
    <div>
      <div className="flex justify-end" onClick={outputHandler}><Button>Run</Button></div>
      <div className="w-full h-[40vh]">
        <Editor
          width="100%"
          height="100%"
          path={data.name}
          value={data.value}
          language={data.lan}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            fontSize: "14px",
            minimap: {
              enabled: false,
            },
            formatOnPaste: true,
            formatOnType: true,
            autoIndent: true,
            autoClosingBrackets: true,
            autoClosingQuotes: true,
            acceptSuggestionOnEnter: "on",
            autoClosingComments: true,
            automaticLayout: true,
            autoClosingOvertype: "always",
            autoClosingDelete: "always",
            tabCompletion: "on",
            wordBasedSuggestions: true,
            suggestOnTriggerCharacters: true,
            suggestSelection: "first",
          }}
        />
      </div>
    </div>
  );
}
