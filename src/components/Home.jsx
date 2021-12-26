import {React,useState} from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EnglishEditor from "./EnglishEditor"
import CEditor from "./CEditor"
import PythonEditor from "./PythonEditor"
import JavaEditor from "./JavaEditor"
import JavascriptEditor from "./JavascriptEditor"
import { useDispatch } from 'react-redux';
import TestComplete from "./TestComplete"

import {startTest,nextActiveChar,nextActiveWord,prevActiveChar,addCorrectCharacter,removeCorrectCharacter,stopTest, resetActiveState, resetCorrectCharacter, getWords, updateWords, resetWrongCount, resetRightCount, changeRightCount, changeWrongCount, resetPresentWord} from "../actions/index"

var rightCount;
var wrongCount;
var timeState;
var tempLiveTimer;
var presentTestTimeState;
var rightCharacterState;

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
    
    let words=useSelector((state)=>{
        return state.handleWordState
    })

    rightCount=useSelector((state)=>{
        return state.handleRightCountState
    })
    
    wrongCount=useSelector((state)=>{
        return state.handleWrongCountState
    })

    rightCharacterState=useSelector((state)=>{
        return state.handleRightCharacterState
    })

    

    let [liveTimer,setLiveTimer]=useState(null)
    
    let [intervalState,setIntervalState]=useState(null)
            
    let [liveWpm,setLiveWpm]=useState(0)
    
    let [liveAccuracy,setLiveAccuracy]=useState(0)

    let [testCompleteState,setTestCompleteState]=useState(false)

    let resetLiveTest=()=>{
        setTestCompleteState(false)
        if(intervalState){
            clearInterval(intervalState)
            setIntervalState(null)
        }
        setLiveTimer(null)
        dispatch(stopTest())
        dispatch(resetActiveState())
        dispatch(resetCorrectCharacter())
        setLiveWpm(0)
        setLiveAccuracy(0)
        dispatch(getWords())
        dispatch(resetWrongCount())
        dispatch(resetRightCount())
        
    }
        
    let startLiveTimer=()=>{
        let intervalId=setInterval(()=>{
            setLiveTimer((prev)=>{
                tempLiveTimer=prev-1
                return prev-1
            })
            setLiveWpm(Math.ceil(((rightCount)*12)/(timeState-tempLiveTimer)))
            if(rightCount!==0){
                setLiveAccuracy(Math.ceil(((rightCount)*100)/(wrongCount+rightCount)))
            }
            // else{
            //     setLiveAccuracy(0)
                    //can add this so that on backspace accuracy will change but there is no need
            // }
            if(tempLiveTimer===0 && intervalId){
                clearInterval(intervalId)
                setLiveTimer(null)
                setIntervalState(null)
                setTestCompleteState(true)
                dispatch(stopTest())
            }
        },1000)

        setIntervalState(()=>{
            return intervalId
        })
    }
    
    const [flag,setFlag]=useState(true)
    
    const handleScroll = () => {
        if(flag && activeWordState.word!==0){
            setFlag(()=> false)
            dispatch(updateWords(activeWordState.word))
            dispatch(resetActiveState())
            dispatch(resetCorrectCharacter())
            
            setTimeout(()=>{
                setFlag(()=>true)
            },200)
            
        }
    }
    
    
    window.onkeydown=(e)=>{

        if((e.key.length>1 && e.key!=="Tab" && e.key!=="Backspace")|| testCompleteState){
            return ;
        }

        if(liveTimer===null && e.key!=="Tab"){
            setLiveTimer(timeState)
            presentTestTimeState=timeState
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
                    dispatch(changeRightCount(1))
                    dispatch(changeWrongCount(words[activeWordState.word].length-activeWordState.char))
                    dispatch(nextActiveWord())
                }
                break
            case "Backspace":
                e.preventDefault()
                if(activeWordState.char!==0){
                    if(e.ctrlKey){
                        let tempRight=0,tempWrong=0;
                        for(let i=0;i<activeWordState.char;i++){
                            if(rightCharacterState.has(activeWordState.word*100+i)){
                                tempRight++;
                                dispatch(removeCorrectCharacter(activeWordState.word,i))
                            }
                            else{
                                tempWrong++;
                            }
                        }
                        dispatch(changeWrongCount(-tempWrong))
                        dispatch(changeRightCount(-tempRight))
                        dispatch(resetPresentWord())

                    }
                    else{
                        if(rightCharacterState.has(activeWordState.word*100+activeWordState.char-1)){
                            dispatch(changeRightCount(-1))
                        }
                        else{
                            dispatch(changeWrongCount(-1))
                        }
                        dispatch(removeCorrectCharacter(activeWordState.word,activeWordState.char))
                        dispatch(prevActiveChar())
                    }
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
                    dispatch(changeRightCount(1))
                }
                else{
                    dispatch(nextActiveChar())
                    dispatch(changeWrongCount(1))
                }
        }
    }
    

    return (
        <>
            <div>
                {liveTimer ? liveTimer:(testCompleteState ? presentTestTimeState : timeState)}
            </div>
            <div>
                {liveWpm}
            </div>
            <div>
                {liveAccuracy}%
            </div>

                <div >
                    {languageState==="English"  && !testCompleteState && <EnglishEditor handleScroll={handleScroll} />}
                    {languageState==="Python"  && !testCompleteState && <PythonEditor/>}
                    {languageState==="C"  && !testCompleteState && <CEditor/>}
                    {languageState==="Java"  && !testCompleteState && <JavaEditor/>}
                    {languageState==="Javascript" && !testCompleteState && <JavascriptEditor/>}
                    {testCompleteState && <TestComplete resetLiveTest={resetLiveTest} />}

                </div>

        </>
    )
}
