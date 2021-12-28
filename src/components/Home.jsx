import {React,useState,useEffect,useRef} from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EnglishEditor from "./EnglishEditor"
import { useDispatch } from 'react-redux';
import TestComplete from "./TestComplete"

import {startTest,nextActiveChar,nextActiveWord,prevActiveChar,addCorrectCharacter,removeCorrectCharacter,stopTest, resetActiveState, resetCorrectCharacter, getWords, updateWords, resetWrongCount, resetRightCount, changeRightCount, changeWrongCount, resetPresentWord, nextActiveLine, getLanguageWords, updateLanguageWords, activeWordEnd} from "../actions/index"
import OtherLanguageEditor from './OtherLanguageEditor';

var rightCount;
var wrongCount;
var timeState;
var tempLiveTimer;
var presentTestTimeState;
var rightCharacterState;
var codeLineWords

export default function Home() {
    
    const dispatch=useDispatch()
    
    let history=useHistory();
    
    let guestState=useSelector((state)=>{
        return state.handleGuestState
    })

    if(!localStorage.getItem("token") && !guestState){
        history.push("/login")
    }

    const restartButton=useRef(null)

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

    let [focusedOnRestartButton,setFocusedStateOnRestartButton]=useState(false)

    useEffect(()=>{

    },[setFocusedStateOnRestartButton])

    const getProperWords=()=>{
        if(languageState==="English"){
            dispatch(getWords())
        }
        else {
            dispatch(getLanguageWords(languageState))
        }
    }

    const updateProperWords=()=>{
        
        if(languageState==="English"){
            dispatch(updateWords(activeWordState.word))
        }
        else{
            
            dispatch(updateLanguageWords(languageState))
        }
    }

    let resetLiveTest=()=>{
        getProperWords()
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
        dispatch(resetWrongCount())
        dispatch(resetRightCount())
        if(restartButton.current){
            restartButton.current.blur()
            setFocusedStateOnRestartButton(false)
        }
        
    }
        
    let startLiveTimer=()=>{
        let intervalId=setInterval(()=>{
            setLiveTimer((prev)=>{
                tempLiveTimer=prev-1
                return prev-1
            })
            if(rightCount>0){
                setLiveWpm(Math.ceil(((rightCount)*12)/(timeState-tempLiveTimer)))
                setLiveAccuracy(Math.ceil(((rightCount)*100)/(wrongCount+rightCount)))
            }
            else{
                setLiveWpm(0)
                setLiveAccuracy(0)
            }
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
        
        if(flag && (activeWordState.word+activeWordState.line!==0)){
            setFlag(()=> false)
            
            dispatch(resetActiveState())
            updateProperWords()
            dispatch(resetCorrectCharacter())
            
            setTimeout(()=>{
                setFlag(()=>true)
            },200)
            
        }

    }

    useEffect(()=>{
        if(languageState!=="English" && words.length!==0){
            codeLineWords=words[activeWordState.line].split(" ")
        }
        else{
            codeLineWords=[]
        }
    },[activeWordState,words,languageState])
    
    
    window.onkeydown=(e)=>{

        if(testCompleteState){
            if(e.key===" "){
                e.preventDefault()
            }
            return ;
        }

        if((e.key.length>1 && e.key!=="Tab" && e.key!=="Backspace" && e.key!=="Enter")){
            return ;
        }

        if(liveTimer===null && e.key!=="Tab"){
            setLiveTimer(timeState)
            presentTestTimeState=timeState
            startLiveTimer()
        }
        if(liveTimer===0){

            if(e.key==="Tab"){
                if(restartButton.current){
                    restartButton.current.focus()
                    setFocusedStateOnRestartButton(true)
                }
                e.preventDefault()
            }
            return ;
        }
        if(restartButton.current && e.key!=="Enter"){
            restartButton.current.blur()
            setFocusedStateOnRestartButton(false)
        }
        switch(e.key){
            case "Tab":
                e.preventDefault()
                if(restartButton.current){
                    restartButton.current.focus()
                    setFocusedStateOnRestartButton(true)
                }
                break
            case " ":
                e.preventDefault()
                if(activeWordState.char!==0){
                    if(languageState==="English"){
                        dispatch(changeRightCount(1))
                        dispatch(nextActiveWord())
                        dispatch(changeWrongCount(words[activeWordState.word].length-activeWordState.char))
                    }
                    else{
                        if(codeLineWords.length===activeWordState.word+1){
                            dispatch(activeWordEnd(codeLineWords[activeWordState.word].length))
                        }
                        else{
                            dispatch(changeRightCount(1))
                            dispatch(nextActiveWord())
                        }
                        dispatch(changeWrongCount(codeLineWords[activeWordState.word].length-activeWordState.char))
                    }
                    
                }
                break
            
            case "Enter":
                e.preventDefault()
                if(languageState!=="English" && ((activeWordState.word+1)===codeLineWords.length) && activeWordState.char===codeLineWords[activeWordState.word].length){
                    dispatch(changeRightCount(1))                    
                    dispatch(nextActiveLine())
                }

                if(focusedOnRestartButton && restartButton.current){
                    restartButton.current.click()
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

                if(languageState==="English"){
                    if(key===words[activeWordState.word][activeWordState.char]){
                        dispatch(addCorrectCharacter(activeWordState.word,activeWordState.char))
                        dispatch(nextActiveChar())
                        dispatch(changeRightCount(1))
                    }
                    else if(words[activeWordState.word].length===activeWordState.char){
                        //
                    }
                    else{
                        dispatch(nextActiveChar())
                        dispatch(changeWrongCount(1))
                    }
                    
                }
                else{
                    if(key===codeLineWords[activeWordState.word][activeWordState.char]){
                        dispatch(addCorrectCharacter(activeWordState.word,activeWordState.char))
                        dispatch(nextActiveChar())
                        dispatch(changeRightCount(1)) 
                    }
                    else if(codeLineWords[activeWordState.word].length===activeWordState.char){
                        //
                    }
                    else{
                        dispatch(nextActiveChar())
                        dispatch(changeWrongCount(1))
                    }
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

            <div>
                {languageState==="English"  && !testCompleteState && <EnglishEditor handleScroll={handleScroll} getProperWords={getProperWords}/>}
                {languageState!=="English"  && !testCompleteState && <OtherLanguageEditor handleScroll={handleScroll} getProperWords={getProperWords} />}
                {testCompleteState && <TestComplete resetLiveTest={resetLiveTest} />}

            </div>
            <div className='restartButton'>

                {!testCompleteState && <button className='btn btn-warning' ref={restartButton} onClick={()=>{resetLiveTest()}}>Restart</button>}
            </div>

        </>
    )
}
