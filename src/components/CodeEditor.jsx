import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

const CodeEditor = () => {
  const [code, setCode] = useState(`function greet(name) {
  return "Hello " + name;
}

greet("Your name");`);
  const [output, setOutput] = useState("");

  useEffect(() => {
    try {
      // Capture and show the return value of the code
      const result = eval(code);
      setOutput(result?.toString());
    } catch (err) {
      setOutput(err.message);
    }
  }, [code]);

  return (
    <div className="h-full flex flex-col gap-4">
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={(code) =>
          Prism.highlight(code, Prism.languages.javascript, "javascript")
        }
        padding={12}
        className="text-white bg-transparent outline-none font-mono text-sm min-h-[200px]"
        style={{
          backgroundColor: "transparent",
          fontFamily: '"Fira code", "Fira Mono", monospace',
        }}
      />

      <div className="text-white text-sm bg-black/40 p-3 rounded">
        <strong>Output:</strong>
        <pre className="mt-2 whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
