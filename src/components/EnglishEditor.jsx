import { React, useRef, useEffect, useState } from 'react'

export default function EnglishEditor() {


    const triggerTextArea = useRef(null)

    const [text, setText] = useState("")

    useEffect(() => {
        triggerTextArea.current.focus()
        console.log("triggred")
    }, [])

    const handleChange = (event) => {
        setText((prev) => {
            return event.target.value
        })
        console.log(event.target.value)
    }

    return (
        <>
            <textarea className='w-100 textArea' ref={triggerTextArea} spellCheck={false} value={"This is the sentence given to me by this "} >

            </textarea>

            <textarea className='w-100 textArea' ref={triggerTextArea} spellCheck={false} value={text} onChange={handleChange} />

        </>
    );
}

