import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDarkTheme } from '@codemirror/theme-one-dark';


export default function PythonEditor() {

    return (
      <CodeMirror
        value="console.log('hello world!');"
        height="200px"
        theme={oneDarkTheme}
        extensions={[python()]}
        onChange={(value, viewUpdate) => {
          console.log('value:', value);
        }}
      />
    );
}
