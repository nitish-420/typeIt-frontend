import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDarkTheme } from '@codemirror/theme-one-dark';


export default function JavascriptEditor() {

    return (
      <CodeMirror
        value="console.log('hello world!');"
        height="200px"
        theme={oneDarkTheme}
        extensions={[javascript({ jsx: true })]}
        onChange={(value, viewUpdate) => {
          console.log('value:', value);
        }}
      />
    );
}
