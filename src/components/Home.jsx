import {React,useState,useEffect,useRef} from 'react'
import { useHistory,useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EnglishEditor from "./EnglishEditor"
import { useDispatch } from 'react-redux';
import TestComplete from "./TestComplete"
import Loader from "react-loader"

import {startTest,nextActiveChar,nextActiveWord,prevActiveChar,addCorrectCharacter,removeCorrectCharacter,stopTest, resetActiveState, resetCorrectCharacter, getWords, updateWords, resetPresentWord, nextActiveLine, getLanguageWords, updateLanguageWords, activeWordEnd, setCurrentUser, showAlert} from "../actions/index"
import OtherLanguageEditor from './OtherLanguageEditor';

var rightCount=0;
var wrongCount=0;
var timeState;
var tempLiveTimer;
var rightCharacterState;
var codeLineWords
var userState

export default function Home() {
    
    const dispatch=useDispatch()
    
    let history=useHistory();

    const location=useLocation();
    
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


    rightCharacterState=useSelector((state)=>{
        return state.handleRightCharacterState
    })
    
    userState=useSelector((state)=>{
        return state.handleUserState
    })

    let [liveTimer,setLiveTimer]=useState(null)
    
    let [intervalState,setIntervalState]=useState(null)
            
    let [liveWpm,setLiveWpm]=useState(0)
    
    let [liveAccuracy,setLiveAccuracy]=useState(0)

    let [testCompleteState,setTestCompleteState]=useState(false)

    let [focusedOnRestartButton,setFocusedStateOnRestartButton]=useState(false)

    const [loaderState,setLoaderState]=useState(true)

    
    useEffect(()=>{
        
        const getCurrentUser = async()=>{
            try{
                setLoaderState(false)
                const response=await fetch("http://localhost:5000/api/auth/getuser",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        "auth-token":`${localStorage.getItem("token")}`
                    },
                    
                })  
                const json=await response.json()
                if(json.success){
                    dispatch(setCurrentUser(json.user))
                }
                else{
                    dispatch(showAlert(json.error,"danger"))
                    history.push("/login")
                }
                setLoaderState(true)
            }
            catch(e){
                history.push("/login")
                dispatch(showAlert("Please login or select to play as a guest !","danger"))

            }
        }
        if(userState.id==null && !guestState){
            getCurrentUser()
        }
        
        return ()=>{
            //adding return will work as componentWillUnmount() ie. it will run when this component will unmount
            window.onkeydown=null;
            setLoaderState(true)
        }
    },[dispatch,guestState,history])

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
        // dispatch(resetWrongCount())
        // dispatch(resetRightCount())
        rightCount=0
        wrongCount=0
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

        if(!e.key || location.pathname!=="/" ){
            return ;
        }

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
                        // dispatch(changeRightCount(1))
                        rightCount+=1
                        dispatch(nextActiveWord())
                        // dispatch(changeWrongCount(words[activeWordState.word].length-activeWordState.char))
                        wrongCount+=words[activeWordState.word].length-activeWordState.char
                    }
                    else{
                        if(codeLineWords.length===activeWordState.word+1){
                            dispatch(activeWordEnd(codeLineWords[activeWordState.word].length))
                        }
                        else{
                            // dispatch(changeRightCount(1))
                            rightCount+=1
                            dispatch(nextActiveWord())
                        }
                        // dispatch(changeWrongCount(codeLineWords[activeWordState.word].length-activeWordState.char))
                        wrongCount+=codeLineWords[activeWordState.word].length-activeWordState.char
                    }
                    
                }
                break
            
            case "Enter":
                e.preventDefault()
                if(languageState!=="English" && ((activeWordState.word+1)===codeLineWords.length) && activeWordState.char===codeLineWords[activeWordState.word].length){
                    // dispatch(changeRightCount(1))                    
                    rightCount+=1
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
                        // dispatch(changeWrongCount(-tempWrong))
                        wrongCount-=tempWrong
                        // dispatch(changeRightCount(-tempRight))
                        rightCount-=tempRight
                        dispatch(resetPresentWord())

                    }
                    else{
                        if(rightCharacterState.has(activeWordState.word*100+activeWordState.char-1)){
                            // dispatch(changeRightCount(-1))
                            rightCount-=1
                        }
                        else{
                            // dispatch(changeWrongCount(-1))
                            wrongCount-=1
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
                        // dispatch(changeRightCount(1))
                        rightCount+=1
                    }
                    else if(words[activeWordState.word].length===activeWordState.char){
                        //
                    }
                    else{
                        dispatch(nextActiveChar())
                        // dispatch(changeWrongCount(1))
                        wrongCount+=1
                    }
                    
                }
                else{
                    if(key===codeLineWords[activeWordState.word][activeWordState.char]){
                        dispatch(addCorrectCharacter(activeWordState.word,activeWordState.char))
                        dispatch(nextActiveChar())
                        // dispatch(changeRightCount(1)) 
                        rightCount+=1
                    }
                    else if(codeLineWords[activeWordState.word].length===activeWordState.char){
                        //
                    }
                    else{
                        dispatch(nextActiveChar())
                        // dispatch(changeWrongCount(1))
                        wrongCount+=1
                    }
                }

            }
        }
        
        
        return (
            <>
            <Loader loaded={loaderState} className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} top="30%"/>
            {loaderState && <div>
                {!testCompleteState ? <div>
                    <div>
                        {liveTimer ? liveTimer : timeState}
                    </div>
                    <div>
                        {liveWpm}
                    </div>
                    <div>
                        {liveAccuracy}%
                    </div>

                    <div>
                        {languageState==="English"  && <EnglishEditor handleScroll={handleScroll} getProperWords={getProperWords}/>}
                        {languageState!=="English"  &&  <OtherLanguageEditor handleScroll={handleScroll} getProperWords={getProperWords} />}
                    </div>
                    <div className='restartButton'>
                        <button className='btn btn-warning' ref={restartButton} onClick={()=>{resetLiveTest()}}>Restart</button>
                    </div>
                </div>
                :
                <div>
                    <TestComplete resetLiveTest={resetLiveTest} testTime={timeState} speed={liveWpm} accuracy={liveAccuracy} language={languageState} />
                </div> 
                }
            </div>}

        </>
    )
}
