import {React} from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EnglishEditor from "./EnglishEditor"
import CEditor from "./CEditor"
import PythonEditor from "./PythonEditor"
import JavaEditor from "./JavaEditor"
import JavascriptEditor from "./JavascriptEditor"
import Restart from './Restart';
import TestComplete from './TestComplete';
import { useDispatch } from 'react-redux';
import {onRestart,startTest,nextActiveChar,nextActiveWord,prevActiveChar,addCorrectCharacter,removeCorrectCharacter} from "../actions/index"


export default function Home() {
    
    const dispatch=useDispatch()
    
    let history=useHistory();
    
    const guestState=useSelector((state)=>{
        return state.handleGuestState
    })

    if(!localStorage.getItem("token") && !guestState){
        history.push("/login")
    }
    let languageState=useSelector((state)=>{
        return state.handleLanguageState
    })

    let restartState=useSelector((state)=>{
        return state.handleRestartState
    })


    const testState=useSelector((state)=>{
        return state.handleTestState
    })
    
    const timeState=useSelector((state)=>{
        return state.handleTimeState
    })
    
    const activeWordState=useSelector((state)=>{
        return state.handleActiveWordState
    })

    const testCompleteState=useSelector((state)=>{
        return state.handleTestCompleteState
    })
    
    
    const words=useSelector((state)=>{
        return state.handleWordState
    })
    let area=document.getElementById("activeWord")
    
    window.onkeydown=(e)=>{
        switch(e.key){
            case "Tab":
                e.preventDefault()
                dispatch(onRestart())
                break
            case "Escape":
                e.preventDefault()
                break
            case " ":
                e.preventDefault()
                if(activeWordState.char!==0){
                    dispatch(nextActiveWord())
                }
                area=document.getElementById("activeWord")
                if(area !==null){
                    area.scrollIntoView({
                        block:"center"
                    })
                }
                break
            case "Backspace":
                e.preventDefault()
                if(activeWordState.char!==0){
                    dispatch(removeCorrectCharacter(activeWordState.word,activeWordState.char))
                    dispatch(prevActiveChar())
                }
                break
            default :
                e.preventDefault()
                if(!testState){
                    dispatch(startTest(timeState))
                }
                let key=e.key
                if(key===words[activeWordState.word][activeWordState.char]){
                    dispatch(addCorrectCharacter(activeWordState.word,activeWordState.char))
                    dispatch(nextActiveChar())
                }
                else{
                    console.log("danger")
                    dispatch(nextActiveChar())
                }


        }
    }


    return (
        <>
            
            {languageState==="English" && !restartState &&!testCompleteState && <EnglishEditor/>}
            {languageState==="Python" && !restartState &&!testCompleteState && <PythonEditor/>}
            {languageState==="C" && !restartState &&!testCompleteState && <CEditor/>}
            {languageState==="Java" && !restartState &&!testCompleteState && <JavaEditor/>}
            {languageState==="Javascript" && !restartState &&!testCompleteState && <JavascriptEditor/>}
            {restartState &&!testCompleteState && <Restart/>}
            {testCompleteState && <TestComplete/>}

        </>
    )
}
