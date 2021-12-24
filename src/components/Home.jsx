import {React,useState} from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EnglishEditor from "./EnglishEditor"
import CEditor from "./CEditor"
import PythonEditor from "./PythonEditor"
import JavaEditor from "./JavaEditor"
import JavascriptEditor from "./JavascriptEditor"
import { useDispatch } from 'react-redux';
import {startTest,nextActiveChar,nextActiveWord,prevActiveChar,addCorrectCharacter,removeCorrectCharacter,stopTest,removeWrongCharacter,addWrongCharacter, resetActiveState, resetCorrectCharacter, resetWrongCharacter, resetLiveAccuracy, resetLiveWpm, getWords, setLiveWpm, setLiveAccuracy,setLiveTimer,resetLiveTimer} from "../actions/index"

var rightCharacterState;
var wrongCharacterState;
var liveTimer;
var timeState;

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

    let testState=useSelector((state)=>{
        return state.handleTestState
    })
    
    timeState=useSelector((state)=>{
        return state.handleTimeState
    })
    
    let activeWordState=useSelector((state)=>{
        return state.handleActiveWordState
    })

    let testCompleteState=useSelector((state)=>{
        return state.handleTestCompleteState
    })
    
    wrongCharacterState=useSelector((state)=>{
        return state.handleWrongCharacterState
    })
    
    liveTimer=useSelector((state)=>{
        return state.handleLiveTimerState
    })
    
    let words=useSelector((state)=>{
        return state.handleWordState
    }
    )
    rightCharacterState=useSelector((state)=>{
        return state.handleRightCharacterState
    })
    
    let area=document.getElementById("activeWord")
    
    let [intervalState,setIntervalState]=useState(null)
            
    // let [liveWpm,setLiveWpm]=useState(0)
    
    // let [liveAccuracy,setLiveAccuracy]=useState(0)
    
    let resetLiveTest=()=>{
        if(intervalState){
            clearInterval(intervalState)
            setIntervalState(null)
        }
        dispatch(resetLiveTimer())
        dispatch(stopTest())
        dispatch(resetActiveState())
        dispatch(resetCorrectCharacter())
        dispatch(resetWrongCharacter())
        dispatch(resetLiveAccuracy())
        dispatch(resetLiveWpm())
        dispatch(getWords())
        
    }
        
    let startLiveTimer=()=>{
        let intervalId=setInterval(()=>{
            dispatch(setLiveTimer(liveTimer-1))
            dispatch(setLiveWpm(Math.ceil((rightCharacterState.size*12)/(timeState-liveTimer))))
            if(rightCharacterState.size){
                dispatch(setLiveAccuracy(Math.ceil((rightCharacterState.size*100)/(rightCharacterState.size+wrongCharacterState.size))))
            }
            if(liveTimer===0 && intervalId){
                clearInterval(intervalId)
                dispatch(resetLiveTimer())
                setIntervalState(null)
                resetLiveTimer()
            }
        },1000)

        setIntervalState((prev)=>{
            return intervalId
        })
    }



    
    window.onkeydown=(e)=>{

        if(e.key.length>1 && e.key!=="Tab" && e.key!=="Backspace"){
            return ;
        }

        if(liveTimer===null && e.key!=="Tab"){
            dispatch(setLiveTimer(timeState))
            startLiveTimer()
        }
        if(liveTimer===0){

            if(e.key==="Tab"){
                resetLiveTest()
                e.preventDefault()
            }
            return ;
        }
        switch(e.key){
            case "Tab":
                e.preventDefault()
                if(liveTimer!==timeState){
                    resetLiveTest()
                }
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


    return (
        <>
            {liveTimer ? liveTimer:timeState}
            {languageState==="English"  && !testCompleteState && <EnglishEditor/>}
            {languageState==="Python"  && !testCompleteState && <PythonEditor/>}
            {languageState==="C"  && !testCompleteState && <CEditor/>}
            {languageState==="Java"  && !testCompleteState && <JavaEditor/>}
            {languageState==="Javascript" && !testCompleteState && <JavascriptEditor/>}
            {/* {restartState && !testCompleteState && <Restart/>} */}
            {/* {testCompleteState && !testState && <TestComplete/>} */}

        </>
    )
}
