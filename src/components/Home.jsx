import {React} from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EnglishEditor from "./EnglishEditor"
import CEditor from "./CEditor"
import PythonEditor from "./PythonEditor"
import JavaEditor from "./JavaEditor"
import JavascriptEditor from "./JavascriptEditor"

export default function Home() {

    let languageState=useSelector((state)=>{
        return state.handleLanguageState
    })



    const guestState=useSelector((state)=>{
        return state.handleGuestState
    })


    let history=useHistory();
    
    if(!localStorage.getItem("token") && !guestState){
        history.push("/login")
    }



    return (
        <>
            
            {languageState==="English" && <EnglishEditor/>}
            {languageState==="Python" && <PythonEditor/>}
            {languageState==="C" && <CEditor/>}
            {languageState==="Java" && <JavaEditor/>}
            {languageState==="Javascript" && <JavascriptEditor/>}
        </>
    )
}
