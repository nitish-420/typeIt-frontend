import {React,useState,useEffect,useRef,useCallback} from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EnglishEditor from "./EnglishEditor"
import CEditor from "./CEditor"
import PythonEditor from "./PythonEditor"
import JavaEditor from "./JavaEditor"
import JavascriptEditor from "./JavascriptEditor"
import { useDispatch } from 'react-redux';
import TestComplete from "./TestComplete"
import {startTest,nextActiveChar,nextActiveWord,prevActiveChar,addCorrectCharacter,removeCorrectCharacter,stopTest,removeWrongCharacter,addWrongCharacter, resetActiveState, resetCorrectCharacter, resetWrongCharacter, getWords} from "../actions/index"

var rightCharacterState;
var wrongCharacterState;
var timeState;
var tempLiveTimer;
var presentTestTimeState;

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

    wrongCharacterState=useSelector((state)=>{
        return state.handleWrongCharacterState
    })
    
    let words=useSelector((state)=>{
        return state.handleWordState
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
        dispatch(resetWrongCharacter())
        setLiveWpm(0)
        setLiveAccuracy(0)
        dispatch(getWords())
        
    }
        
    let startLiveTimer=()=>{
        let intervalId=setInterval(()=>{
            setLiveTimer((prev)=>{
                tempLiveTimer=prev-1
                return prev-1
            })
            setLiveWpm(Math.ceil((rightCharacterState.size*12)/(timeState-tempLiveTimer)))
            if(rightCharacterState.size){
                setLiveAccuracy(Math.ceil((rightCharacterState.size*100)/(rightCharacterState.size+wrongCharacterState.size)))
            }
            if(tempLiveTimer===0 && intervalId){
                clearInterval(intervalId)
                setLiveTimer(null)
                setIntervalState(null)
                setTestCompleteState(true)
                dispatch(stopTest())
            }
        },1000)

        setIntervalState((prev)=>{
            return intervalId
        })
    }


    const areaRef = useRef();
    
    // The scroll listener
    const handleScroll = useCallback(() => {
      console.log("scrolling");
    }, []);

    useEffect(()=>{
        let area=document.getElementById("activeWord")
        if(area !==null){
            const div = areaRef.current;
            div.addEventListener('scroll', handleScroll);
            area.scrollIntoView({
                behavior:"smooth",
                block:"start"
                // block:"center"
            })
            // div.removeEventListener('scroll',handleScroll)
        }
    },[activeWordState,handleScroll])


  
    // // Attach the scroll listener to the div
    // useEffect(() => {
    // }, [handleScroll]);


    
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
                    for(let ii=activeWordState.char;ii<words[activeWordState.word].length;ii++){
                        dispatch(addWrongCharacter(activeWordState.word,ii))
                    }
                    dispatch(nextActiveWord())
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
                {languageState==="English"  && !testCompleteState && <EnglishEditor areaRef={areaRef}/>}
                {languageState==="Python"  && !testCompleteState && <PythonEditor/>}
                {languageState==="C"  && !testCompleteState && <CEditor/>}
                {languageState==="Java"  && !testCompleteState && <JavaEditor/>}
                {languageState==="Javascript" && !testCompleteState && <JavascriptEditor/>}
                {testCompleteState && <TestComplete resetLiveTest={resetLiveTest} />}

            </div>

        </>
    )
}
