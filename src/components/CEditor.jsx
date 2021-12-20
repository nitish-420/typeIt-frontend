import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { oneDarkTheme } from '@codemirror/theme-one-dark';


export default function CEditor() {

    return (
      <CodeMirror
        value="console.log('hello world!');"
        height="200px"
        theme={oneDarkTheme}
        extensions={[cpp()]}
        onChange={(value, viewUpdate) => {
          console.log('value:', value);
        }}
      />
    );
}
