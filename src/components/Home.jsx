/* eslint-disable jsx-a11y/alt-text */
import {React,useState,useEffect,useRef} from 'react'
import { useHistory,useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EnglishEditor from "./EnglishEditor"
import { useDispatch } from 'react-redux';
import TestComplete from "./TestComplete"
import Loader from "react-loader"

import {startTest,nextActiveWord,stopTest, resetActiveState, getWords, updateWords, resetPresentWord, nextActiveLine, getLanguageWords, updateLanguageWords, activeWordEnd, setCurrentUser, showAlert} from "../actions/index"
import OtherLanguageEditor from './OtherLanguageEditor';

import restart from '../Image/restart.png';

var rightCount=0;
var wrongCount=0;
var timeState;
var tempLiveTimer;
var codeLineWords
var userState
var currWordElement
var typedWord=""
var caret
var liveAccuracy=0
var liveWpm=0
var backendUrl="https://type-it-backend.herokuapp.com/"


export default function Home() {
    
    const dispatch=useDispatch()
    
    let history=useHistory();

    const location=useLocation();
    
    let guestState=useSelector((state)=>{
        return state.handleGuestState
    })



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

    
    userState=useSelector((state)=>{
        return state.handleUserState
    })

    let [liveTimer,setLiveTimer]=useState(null)
    
    let [intervalState,setIntervalState]=useState(null)
                
    let [testCompleteState,setTestCompleteState]=useState(false)

    let [focusedOnRestartButton,setFocusedStateOnRestartButton]=useState(false)

    const [loaderState,setLoaderState]=useState(true)
    
    let [currWord,setCurrWord]=useState("")

    
    useEffect(()=>{

        if(!localStorage.getItem("token") && !guestState){
            
            history.push("/login")
        }

        const getCurrentUser = async()=>{
            try{
                setLoaderState(false)
                const response=await fetch(`${backendUrl}api/auth/getuser`,{
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
            liveWpm=0
            liveAccuracy=0
            typedWord=""
            rightCount=0
            wrongCount=0
        }
    },[dispatch,guestState,history])

    useEffect(()=>{
        if(languageState!=="English" && words.length!==0){
            codeLineWords=words[activeWordState.line].split(" ")
        }
        else{
            codeLineWords=[]
        }

        if(languageState==="English"){
            setCurrWord(words[activeWordState.word])
        }
        else{
            setCurrWord(codeLineWords[activeWordState.word])
        }

        currWordElement= document.getElementById("activeWord")
        caret=document.getElementById('caret')


    },[activeWordState,words,languageState])


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

        document.querySelectorAll(".wrong, .right").forEach((el)=>el.classList.remove("wrong","right"))
        getProperWords()
        setTestCompleteState(false)
        if(intervalState){
            clearInterval(intervalState)
            setIntervalState(null)
        }
        setLiveTimer(null)
        dispatch(stopTest())
        dispatch(resetActiveState())
        liveWpm=0
        liveAccuracy=0
        rightCount=0
        wrongCount=0
        if(restartButton.current){
            restartButton.current.blur()
            setFocusedStateOnRestartButton(false)
        }
        typedWord=""
        changeCarretPosition()
        try{
            caret.classList.add("blink")
        }
        catch(e){
            // console.log(e)
        }
    }
        
    let startLiveTimer=()=>{
        try{
            caret.classList.remove("blink")
        }
        catch(e){
            // console.log(e)
        }
        let intervalId=setInterval(()=>{
            setLiveTimer((prev)=>{
                tempLiveTimer=prev-1
                return prev-1
            })
            if(rightCount>0){
                liveWpm=Math.floor(((rightCount)*12)/(timeState-tempLiveTimer))
                liveAccuracy=Math.floor(((rightCount)*100)/(wrongCount+rightCount))
            }
            else{
                liveWpm=0
                liveAccuracy=0
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
            updateProperWords()
            dispatch(resetActiveState())
            document.querySelectorAll(".wrong, .right").forEach((el)=>el.classList.remove("wrong","right"))
            typedWord=""
            changeCarretPosition()
            setTimeout(()=>{
                setFlag(()=>true)
            },200)
        }

    }

    const changeCarretPosition=()=>{
        if(caret===null){
            caret=document.getElementById('caret')
        }
        try{
            caret.style.marginLeft=`${-13+20*typedWord.length}px`;
        }
        catch(e){
            // console.log(e)
        }

    }
    
    
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

        if(currWordElement===null){
            currWordElement= document.getElementById("activeWord")
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
                if(typedWord.length!==0){
                    if(languageState==="English"){
                        // rightCount+=1
                        // removing counting of space as right character
                        dispatch(nextActiveWord())
                        currWordElement.classList.add(typedWord===currWord ? "right" : "wrong")
                        wrongCount+=(currWord.length-typedWord.length)
                        typedWord=""
                        changeCarretPosition()
                    }
                    else{
                        currWordElement.classList.add(typedWord===currWord ? "right" : "wrong")
                        if(codeLineWords.length===activeWordState.word+1){
                            dispatch(activeWordEnd(currWord.length))
                            wrongCount+=(currWord.length-typedWord.length)
                            let tempLen=typedWord.length
                            for(let i=tempLen;i<currWord.length;i++){
                                typedWord+="~"
                                currWordElement.children[i+1].classList.add("wrong")
                                
                            }
                            changeCarretPosition()
                            
                        }
                        else{
                            // rightCount+=1
                            dispatch(nextActiveWord())
                            wrongCount+=(currWord.length-typedWord.length)
                            typedWord=""
                            changeCarretPosition()
                        }
                    }
                }
                break
            
            case "Enter":
                e.preventDefault()
                if(languageState!=="English" && ((activeWordState.word+1)===codeLineWords.length) && typedWord.length===currWord.length){
                    rightCount+=1
                    dispatch(nextActiveLine())
                }

                if(focusedOnRestartButton && restartButton.current){
                    restartButton.current.click()
                }
                
                break
            
            case "Backspace":
                e.preventDefault()
                if(typedWord.length!==0){
                    if(e.ctrlKey){
                        let tempRight=0,tempWrong=0;
                        for(let i=0;i<typedWord.length;i++){
                            if(typedWord[i]===currWord[i]){
                                ++tempRight;
                            }
                            else{
                                ++tempWrong;
                            }
                        }
                        wrongCount-=tempWrong
                        rightCount-=tempRight

                        currWordElement.childNodes.forEach((char)=>{
                            if(char instanceof HTMLSpanElement){
                                char.classList.remove("wrong","right")
                            }
                        })
                        dispatch(resetPresentWord())
                        typedWord=""
                        changeCarretPosition()

                    }
                    else{
                        let key=typedWord.slice(-1)
                        typedWord=typedWord.slice(0,typedWord.length-1)
                        changeCarretPosition()
                        let idx=typedWord.length
                        currWordElement.children[idx+1].classList.remove("wrong","right")

                        if(key===currWord[idx]){
                            --rightCount;
                        }
                        else{
                            --wrongCount;
                        }
                    }
                    currWordElement.classList.remove("wrong")
                }
                break
            default :
                e.preventDefault()
                if(!testState){
                    dispatch(startTest())
                }

                let key=e.key

                if(typedWord.length===currWord.length){
                    return;
                }
                typedWord+=key
                changeCarretPosition()
                let idx=typedWord.length-1
                currWordElement.children[idx+1].classList.add(
                    currWord[idx]===key ? "right" : "wrong"
                )

                if(key===currWord[idx]){
                    ++rightCount;
                    
                }
                else{
                    ++wrongCount;
                }

            }            
        }
        
        
        return (
            <Loader loaded={loaderState} className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} top="30%">
            <div className='homePage'>
                {!testCompleteState ? 
                <div>
                    <div className='d-flex flex-row justify-content-start fs-4 text-warning align-items-center' style={{marginLeft:"15px"}}>
                        <div className='me-3'>
                            {liveTimer ? liveTimer : timeState}
                        </div >
                        <div className='me-3'>
                            {liveWpm}
                        </div>
                        <div className='me-3'>
                            {liveAccuracy}%
                        </div>
                    </div>

                    <div >
                        {languageState==="English"  && <EnglishEditor handleScroll={handleScroll} getProperWords={getProperWords}/>}
                        {languageState!=="English"  &&  <OtherLanguageEditor handleScroll={handleScroll} getProperWords={getProperWords} />}
                    </div>
                    <div className='restartButton'>
                        <button type="button" className="btn btn-outline-secondary no-border"  ref={restartButton} onClick={()=>{resetLiveTest()}} ><img src={restart} width="20" height="20"/></button>
                    </div>
                </div>
                :
                <div>
                    <TestComplete resetLiveTest={resetLiveTest} testTime={timeState} speed={liveWpm} accuracy={liveAccuracy} language={languageState} />
                </div> 
                }
            </div>
        </Loader>
    )
}
