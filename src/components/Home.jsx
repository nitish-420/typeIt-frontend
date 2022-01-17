/* eslint-disable jsx-a11y/alt-text */
import {React,useState,useEffect,useRef} from 'react'
import { useHistory,useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EnglishEditor from "./EnglishEditor"
import { useDispatch } from 'react-redux';
import TestComplete from "./TestComplete"
import Loader from "react-loader"

import {startTest,stopTest, getWords, updateWords, getLanguageWords, updateLanguageWords, setCurrentUser, showAlert, removeGuest, resetCurrentUser, setGuest} from "../actions/index"
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
var typedStack=[]
var caret
var liveAccuracy=0
var liveWpm=0
var currentTestTime
var currentTestLanguage
var backendUrl
var testChartStates=[]

export default function Home(props) {

    
    const dispatch=useDispatch()
    
    let history=useHistory();

    const location=useLocation();
    
    let guestState=useSelector((state)=>{
        return state.handleGuestState
    })

    backendUrl=useSelector((state)=>{
        return state.handleBackendUrlState
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

    let [activeWordIndex,setActiveWordIndex]=useState(0)
    
    useEffect(()=>{

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
                    dispatch(removeGuest())
                }
                else{
                    dispatch(showAlert(json.error,"danger"))
                    dispatch(setGuest())
                    dispatch(resetCurrentUser())
                    localStorage.removeItem("token")
                    history.push("/login")
                }
            }
            catch(e){
                // history.push("/login")
                dispatch(showAlert("Some error occured please try after some time, Sorry for the inconvenience","danger"))
                
                
            }
            setLoaderState(true)
        }
        if(userState.id===null && localStorage.getItem("token")!==null){
            dispatch(showAlert("Getting User data ...","warning"))
            getCurrentUser()
        }
        else if(localStorage.getItem("token")===null){
            dispatch(showAlert("You are playing as a guest, Login for better experience !!!","warning"))
        }

        return ()=>{
            //adding return will work as componentWillUnmount() ie. it will run when this component will unmount
            window.onkeydown=null;
            setLoaderState(true)
            liveWpm=0
            liveAccuracy=0
            typedWord=""
            typedStack=[]
            rightCount=0
            wrongCount=0
            testChartStates=[]
            setActiveWordIndex(0)
        }
    },[dispatch,guestState,history])

    useEffect(()=>{
        if(languageState!=="English" && words.length!==0){
            codeLineWords=words[0].split(" ")
        }
        else{
            codeLineWords=[]
        }

        if(languageState==="English"){
            setCurrWord(words[activeWordIndex])
        }
        else{
            setCurrWord(codeLineWords[activeWordIndex])
        }

        currWordElement= document.getElementById("activeWord")
        caret=document.getElementById('caret')


    },[activeWordIndex,words,languageState])


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
            dispatch(updateWords(activeWordIndex))
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
        setActiveWordIndex(0)
        liveWpm=0
        liveAccuracy=0
        rightCount=0
        wrongCount=0
        if(restartButton.current){
            restartButton.current.blur()
            setFocusedStateOnRestartButton(false)
        }
        typedStack=[]

        typedWord=""
        changeCarretPosition()
        testChartStates=[]
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
        currentTestTime=timeState
        currentTestLanguage=languageState
        testChartStates=[]
        testChartStates.push({
            rightCount:0,
            wrongCount:0,
            speed:0,
            accuracy:0,
            time:0
        })
        let intervalId=setInterval(()=>{
            setLiveTimer((prev)=>{
                tempLiveTimer=prev-1
                return prev-1
            })
            if(rightCount>0){
                liveWpm=Math.ceil(((rightCount)*12)/(timeState-tempLiveTimer))
                liveAccuracy=Math.floor(((rightCount)*100)/(wrongCount+rightCount))
            }
            else{
                liveWpm=0
                liveAccuracy=0
            }
            testChartStates.push({
                rightCount:rightCount,
                wrongCount:wrongCount,
                speed:liveWpm,
                accuracy:liveAccuracy,
                time:timeState-tempLiveTimer
            })

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
        
        if(flag && (activeWordIndex!==0)){
            setFlag(()=> false)
            updateProperWords()
            typedWord=""
            setActiveWordIndex(0)
            changeCarretPosition()
            typedStack=[]
            document.querySelectorAll(".wrong, .right").forEach((el)=>el.classList.remove("wrong","right"))
            setTimeout(()=>{
                setFlag(()=>true)
            },1000)//this is done due to twice calling of handleScroll in firefox browser.
        }

    }

    const changeCarretPosition=()=>{
        if(caret===null){
            caret=document.getElementById('caret')
        }
        try{
            caret.style.marginLeft=`${-11+20*typedWord.length}px`;
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
                    currWordElement.classList.add(typedWord===currWord ? "right" : "wrong")
                    if(currWord.length===typedWord.length){
                        rightCount++;
                    }
                    wrongCount+=(currWord.length-typedWord.length)
                    if (typedWord===currWord){
                        typedStack=[]
                    }
                    else{
                        typedStack.push(typedWord)
                    }
                    typedWord=""
                    setActiveWordIndex(activeWordIndex+1);
                    changeCarretPosition()
                }
                break
            
            case "Enter":
                e.preventDefault()
                if(languageState!=="English" && ((activeWordIndex)>=codeLineWords.length-2) && typedWord.length===currWord.length){
                    rightCount+=1
                    updateProperWords()
                    typedWord=""
                    setActiveWordIndex(0)
                    changeCarretPosition()
                    document.querySelectorAll(".wrong, .right").forEach((el)=>el.classList.remove("wrong","right"))
                    typedStack=[]
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
                else if(typedStack.length!==0){
                    try{
                        currWordElement.previousElementSibling.classList.remove(
                            "right",
                            "wrong"
                        );
                    }
                    catch(e){
                        // console.log(e)
                    }
                    typedWord=typedStack.pop()
                    let prevWord= languageState==="English"? words[activeWordIndex-1]:codeLineWords[activeWordIndex-1]
                    wrongCount-=(prevWord.length-typedWord.length)

                    if(e.ctrlKey){
                        currWordElement.previousElementSibling.childNodes.forEach(
                            (char) => {
                                if (char instanceof HTMLSpanElement)
                                char.classList.remove("wrong", "right");
                            }
                        );

                        for(let i =0;i<typedWord.length;i++){
                            if(prevWord[i]===typedWord[i]){
                                --rightCount;
                            }
                            else{
                                --wrongCount;
                            }
                        }
                        typedWord=""
                    }

                    setActiveWordIndex(activeWordIndex-1)

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
            <Loader loaded={loaderState} className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} position='relative' top="150px" >
            <div className='homePage'>
                {!testCompleteState ? 
                <div>
                    <div className='d-flex flex-row justify-content-start fs-4 align-items-center' style={{marginLeft:"15px",color:"#ffd651"}}>
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
                        {languageState==="English"  && <EnglishEditor handleScroll={handleScroll} getProperWords={getProperWords} caretLength={typedWord.length} activeWordIndex={activeWordIndex}/>}
                        {languageState!=="English"  &&  <OtherLanguageEditor handleScroll={handleScroll} getProperWords={getProperWords} caretLength={typedWord.length} activeWordIndex={activeWordIndex}/>}
                    </div>
                    <div className='restartButton'>
                        <button type="button" className="btn btn-outline-secondary no-border"  ref={restartButton} onClick={()=>{resetLiveTest()}} ><img src={restart} width="20" height="20"/></button>
                    </div>
                </div>
                :
                <div>
                    <TestComplete resetLiveTest={resetLiveTest} testTime={currentTestTime} speed={liveWpm} accuracy={liveAccuracy} language={currentTestLanguage} testChartStates={testChartStates} />
                </div> 
                }
            </div>
        </Loader>
    )
}
