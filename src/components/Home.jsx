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
import {onRestart,startTest,nextActiveChar,nextActiveWord,prevActiveChar,addCorrectCharacter,removeCorrectCharacter,setCompleteTestState,startRunningTime,stopTest,removeWrongCharacter,addWrongCharacter} from "../actions/index"


export default function Home() {
    
    const dispatch=useDispatch()
    
    let history=useHistory();
    
    let guestState=useSelector((state)=>{
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


    let testState=useSelector((state)=>{
        return state.handleTestState
    })
    
    let timeState=useSelector((state)=>{
        return state.handleTimeState
    })
    
    let activeWordState=useSelector((state)=>{
        return state.handleActiveWordState
    })

    let testCompleteState=useSelector((state)=>{
        return state.handleTestCompleteState
    })

    let runningTimeState=useSelector((state)=>{
        return state.handleRunningTimeState
    })
    
    
    let words=useSelector((state)=>{
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
                    for(let ii=activeWordState.char;ii<words[activeWordState.word].length;ii++){
                        dispatch(addWrongCharacter(activeWordState.word,ii))
                    }
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
                    dispatch(removeWrongCharacter(activeWordState.word,activeWordState.char))
                    dispatch(prevActiveChar())
                }
                break
            default :
                e.preventDefault()
                if(!testState){
                    dispatch(startTest())
                    dispatch(startRunningTime())
                }
                let key=e.key
                if(key===words[activeWordState.word][activeWordState.char]){
                    dispatch(addCorrectCharacter(activeWordState.word,activeWordState.char))
                    dispatch(nextActiveChar())
                }
                else{
                    dispatch(addWrongCharacter(activeWordState.word,activeWordState.char))
                    dispatch(nextActiveChar())
                }


        }
    }

    // setInterval(()=>{
    //     if(runningTimeState!==null && Date.now()-runningTimeState>=timeState*1000  && testCompleteState===false){
    //         dispatch(setCompleteTestState())
    //         dispatch(stopTest())
    //     }
    // },1000)


    return (
        <>
            
            {languageState==="English"  && !restartState && !testCompleteState && <EnglishEditor/>}
            {languageState==="Python"  && !restartState && !testCompleteState && <PythonEditor/>}
            {languageState==="C"  && !restartState && !testCompleteState && <CEditor/>}
            {languageState==="Java"  && !restartState && !testCompleteState && <JavaEditor/>}
            {languageState==="Javascript" && !restartState && !testCompleteState && <JavascriptEditor/>}
            {restartState && !testCompleteState && <Restart/>}
            {/* {testCompleteState && !testState && <TestComplete/>} */}

        </>
    )
}
