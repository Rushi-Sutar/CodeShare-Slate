import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/vscode-dark.css"
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/hint/javascript-hint";
import Actions from "../../Actions";

function CodeEditor({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef(null);
  useEffect(() => {
    async function init() {
      editorRef.current = CodeMirror.fromTextArea(
        document.getElementById("realtimeeditor"),
        {
          mode: "javascript",
          theme: "vscode-dark",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
          lineWrapping: true,
        }
      );
      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(Actions.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    }
    init();
    editorRef.current.setSize(null,'100%')
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(Actions.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }
    return () => {
      socketRef.current.off(Actions.CODE_CHANGE);
    };
  }, [socketRef.current]);


  return (
    <>
      <div className="text-md h-screen">
        <textarea id="realtimeeditor"></textarea>
      </div>
    </>
  );
}

export default CodeEditor;
