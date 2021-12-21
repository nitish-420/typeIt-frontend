import {React} from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EnglishEditor from "./EnglishEditor"
import CEditor from "./CEditor"
import PythonEditor from "./PythonEditor"
import JavaEditor from "./JavaEditor"
import JavascriptEditor from "./JavascriptEditor"
import Restart from './Restart';
import { useDispatch } from 'react-redux';
import {onRestart,startTest} from "../actions/index"


export default function Home() {

    const dispatch=useDispatch()

    let languageState=useSelector((state)=>{
        return state.handleLanguageState
    })

    let restartState=useSelector((state)=>{
        return state.handleRestartState
    })

    const guestState=useSelector((state)=>{
        return state.handleGuestState
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

    let history=useHistory();
    
    if(!localStorage.getItem("token") && !guestState){
        history.push("/login")
    }

    window.onkeydown=(e)=>{
        switch(e.key){
            case "Tab":
                e.preventDefault()
                dispatch(onRestart())
                break
            case "Escape":
                e.preventDefault()
                break
            default :
                if(!testState){
                    dispatch(startTest(timeState))
                }

                

        }
    }



    return (
        <>
            
            {languageState==="English" && !restartState && <EnglishEditor/>}
            {languageState==="Python" && !restartState && <PythonEditor/>}
            {languageState==="C" && !restartState && <CEditor/>}
            {languageState==="Java" && !restartState && <JavaEditor/>}
            {languageState==="Javascript" && !restartState && <JavascriptEditor/>}
            {restartState && <Restart/>}
        </>
    )
}
