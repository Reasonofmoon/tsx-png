"use client"

import { useEffect, useState } from "react"
import Editor from "@monaco-editor/react"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  const [mounted, setMounted] = useState(false)

  // This ensures the editor only renders on the client
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Editor
      height="100%"
      defaultLanguage="typescript"
      defaultValue={
        value ||
        `import React from 'react';

const ExampleComponent = () => {
  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Example Component</div>
          <p className="mt-2 text-gray-500">This is a sample React component that will be rendered and converted to PDF.</p>
        </div>
      </div>
    </div>
  );
};

export default ExampleComponent;`
      }
      value={value}
      onChange={(value) => onChange(value || "")}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        scrollBeyondLastLine: false,
        wordWrap: "on",
        tabSize: 2,
        automaticLayout: true,
      }}
      theme="vs-dark"
    />
  )
}
