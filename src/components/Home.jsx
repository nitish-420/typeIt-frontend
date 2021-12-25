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
import {startTest,nextActiveChar,nextActiveWord,prevActiveChar,addCorrectCharacter,removeCorrectCharacter,stopTest,removeWrongCharacter,addWrongCharacter, resetActiveState, resetCorrectCharacter, resetWrongCharacter, getWords, setCurrWord} from "../actions/index"

var rightCharacterState;
var wrongCharacterState;
var timeState;
var tempLiveTimer;
var presentTestTimeState;

export default function Home() {

    
    let history=useHistory();
    
    let guestState=useSelector((state)=>{
        return state.handleGuestState
    })
    
    if(!localStorage.getItem("token") && !guestState){
        history.push("/login")
    }

    const dispatch=useDispatch()

    let words=useSelector((state)=>{
        return state.handleWordState
    })
    if(words.length===0){
        dispatch(getWords())
    }

    let currWord=useSelector((state)=>{
        return state.handleCurrWordState
    })
    
    if(words.length!==0){
        dispatch(setCurrWord(words[0]))
    }
    
    const [wordState,setWordState]=useState({
        typedWord:"",
        typedHistory:[]
    })
    
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
    
    
    rightCharacterState=useSelector((state)=>{
        return state.handleRightCharacterState
    })
    
    

    let [liveTimer,setLiveTimer]=useState(null)
    
    let [intervalState,setIntervalState]=useState(null)
            
    let [liveWpm,setLiveWpm]=useState(0)
    
    let [liveAccuracy,setLiveAccuracy]=useState(0)

    let [testCompleteState,setTestCompleteState]=useState(false)


    let resetLiveTest=()=>{
        document.querySelectorAll(".wrong, .right").forEach((el)=>el.classList.remove("wrong","right"))
        dispatch(getWords())
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
        dispatch(setCurrWord(words[0]))
        setWordState((prev)=>{
            return {
                typedWord:"",
                typedHistory:[]
            }
        })
        
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
        }
    },[activeWordState,handleScroll])


    
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
        const currIdx=words.indexOf(currWord)
        const currWordElement= document.getElementById("activeWord")
        let {typedWord}=wordState
        // const caret=document.getElementById("caret")
        switch(e.key){
            case "Tab":
                e.preventDefault()
                if(liveTimer!==timeState){
                    resetLiveTest()
                }
                break
            case " ":
                e.preventDefault()
                if(typedWord==="") return ;
                currWordElement.classList.add(typedWord===currWord ? "right" : "wrong")
                setWordState((prev)=>{
                    return {
                        typedWord:"",
                        typedHistory:[...prev.typedHistory,typedWord]
                    }
                })
                dispatch(setCurrWord(words[currIdx+1]))
                break
            case "Backspace":
                e.preventDefault()
                if(typedWord.length===0 && wordState.typedHistory[currIdx-1]!==words[currIdx-1]){
                    dispatch(setCurrWord(words[currIdx-1]))
                    setWordState((prev)=>{
                        return {
                            typedWord:!e.ctrlKey ? prev.typedHistory[currIdx-1]:"",
                            typedHistory:prev.typedHistory.splice(0,currIdx-1)
                        }
                    })
                    currWordElement.previousElementSibling.classList.remove("right","wrong")

                    if(e.ctrlKey){
                        currWordElement.previousElementSibling.childNodes.forEach((char)=>{
                            if(char instanceof HTMLSpanElement){
                                char.classList.remove("wrong","right")
                            }
                        })
                    }
                }
                else{
                    if(e.ctrlKey){
                        setWordState((prev)=>{
                            return {
                                ...prev,
                                typedWord:""
                            }
                        })
                        currWordElement.childNodes.forEach((char) => {
							if (char instanceof HTMLSpanElement)
								char.classList.remove("wrong", "right");
						});

                    }
                    else{
                        setWordState((prev)=>{
                            typedWord.slice(0,typedWord.length-1)
                            let idx=typedWord.length
                            if(idx<currWord.length){
                                currWordElement.children[idx+1].classList.remove("wrong","right")
                            }

                            return {
                                ...prev,
                                typedWord:typedWord
                            }
                        })
                    }
                }
                break
            default :
                e.preventDefault()
                if(!testState){
                    dispatch(startTest())
                }
                let key=e.key
                setWordState((prev)=>{
                    typedWord+=key
                    let idx=typedWord.length-1
                    currWordElement.children[idx+1].classList.add(
                        currWord[idx]===typedWord[idx] ? "right" : "wrong"
                    )
                    return {
                        ...prev,
                        typedWord:typedWord
                    }
                })


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
                {languageState==="English"  && !testCompleteState && <EnglishEditor areaRef={areaRef} />}
                {languageState==="Python"  && !testCompleteState && <PythonEditor/>}
                {languageState==="C"  && !testCompleteState && <CEditor/>}
                {languageState==="Java"  && !testCompleteState && <JavaEditor/>}
                {languageState==="Javascript" && !testCompleteState && <JavascriptEditor/>}
                {testCompleteState && <TestComplete resetLiveTest={resetLiveTest} />}

            </div>

        </>
    )
}
