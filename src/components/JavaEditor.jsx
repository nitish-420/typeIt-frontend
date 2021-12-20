import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';
import { oneDarkTheme } from '@codemirror/theme-one-dark';


export default function JavaEditor() {

    return (
      <CodeMirror
        value="console.log('hello world!');"
        height="200px"
        theme={oneDarkTheme}
        extensions={[java()]}
        onChange={(value, viewUpdate) => {
          console.log('value:', value);
        }}
      />
    );
}
