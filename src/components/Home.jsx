import {React,useRef,useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Home() {

    const triggerTextArea=useRef(null)

    const guestState=useSelector((state)=>{
        return state.handleGuestState
    })
    

    let history=useHistory();
    
    if(!localStorage.getItem("token") && !guestState){
        history.push("/login")
    }

    useEffect(()=>{
        triggerTextArea.current.focus()
        console.log("triggred")
    },[])

    return (
        <>
            <textarea className='w-100 textArea' ref={triggerTextArea} spellCheck={false} >
                This is the sentence given to me by this 
            </textarea>
        </>
    )
}
