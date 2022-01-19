import {React,useRef,useState} from 'react'
import { useSelector ,useDispatch} from 'react-redux'
// import Loader from "react-loader"
//removed loader from here will add if needed in future 
import { setCurrentUser, showAlert } from '../actions'
import CurrentTestChart from './CurrentTestChart'
// import { UilArrowCircleRight } from '@iconscout/react-unicons'
import { UisArrowCircleRight } from '@iconscout/react-unicons-solid'

var userState
var guestState
var backendUrl


export default function TestComplete(props) {
    
    const {resetLiveTest}=props

    const dispatch=useDispatch()

    const resetButton=useRef(null)
    
    const [savedThisTest,setSavedThisTest]=useState(false)

    const [isHighScore,setIsHighScore]=useState(false)

    guestState=useSelector((state)=>{
        return state.handleGuestState
    })
    
    userState=useSelector((state)=>{
        return state.handleUserState
    })

    backendUrl=useSelector((state)=>{
        return state.handleBackendUrlState
    })
    
    // const [loaderState,setLoaderState]=useState(true)

    const saveCurrentTestCase=async ()=>{
        try{
            // setLoaderState(false)
            // this is done in order just show result instantly
            
            let updatedUser={...userState}
            updatedUser.numberOfTestsGiven+=1
            updatedUser.totalTimeSpend+=props.testTime
            if (userState.bestSpeed<props.speed){
                updatedUser.bestAccuracy=props.accuracy
                updatedUser.bestSpeed=props.speed
            }
            else if (userState.bestSpeed===props.speed && updatedUser.bestAccuracy<props.accuracy){
                updatedUser.bestAccuracy=props.accuracy
            }
            updatedUser.averageSpeed=parseFloat((userState.averageSpeed*userState.numberOfTestsGiven+props.speed)/updatedUser.numberOfTestsGiven).toFixed(2)
            updatedUser.averageAccuracy=parseFloat((userState.averageAccuracy*userState.numberOfTestsGiven+props.accuracy)/updatedUser.numberOfTestsGiven).toFixed(2)
            
            let response=await fetch(`${backendUrl}api/test/createtest`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "auth-token":`${localStorage.getItem("token")}`
                },

                body:JSON.stringify({
                    "testTime":`${props.testTime}`,
                    "speed":`${props.speed}`,
                    "accuracy":`${props.accuracy}`,
                    "language":`${props.language}`,
                    "numberOfTestsGiven":`${updatedUser.numberOfTestsGiven}`,
                    "totalTimeSpend":`${updatedUser.totalTimeSpend}`,
                    "bestSpeed":`${updatedUser.bestSpeed}`,
                    "averageSpeed":`${updatedUser.averageSpeed}`,
                    "bestAccuracy":`${updatedUser.bestAccuracy}`,
                    "averageAccuracy":`${updatedUser.averageAccuracy}`
                })

            })

            let json=await response.json()

            if(json.success===1){
                updatedUser.tests.push(json.savedTest)
                dispatch(setCurrentUser(updatedUser))
                setIsHighScore(false)
            }
            else if(json.success===2){
                setIsHighScore(true)
                let bestIndex=-1;
                for(let i=0;i<updatedUser.bests.length;i++){
                    if(updatedUser.bests[i].testTime===props.testTime && updatedUser.bests[i].language===props.language){
                        bestIndex=i;
                        break;
                    }
                }
                if(bestIndex!==-1){
                    updatedUser.bests.splice(bestIndex,1)
                }
                updatedUser.bests.push(json.savedTest)
                updatedUser.tests.push(json.savedTest)
                dispatch(setCurrentUser(updatedUser))
            }
            else{
                dispatch(showAlert(json.error,"danger"))
            }
            
            // setLoaderState(true)
        }
        catch(e){
            dispatch(showAlert("Something went wrong this test case is not submitted, sorry for the inconvenience","danger"))
            // setLoaderState(true)
        }
    }

    const validTestCase=()=>{
        if(props.speed*props.accuracy<1000){
            dispatch(showAlert("Invalid Test Case, It will not be stored in database","warning",2500))
            return false
        }
        return true
    }

    if(!guestState && savedThisTest===false && validTestCase()){
        setSavedThisTest(true)
        saveCurrentTestCase()
    }

    window.onkeydown=(e)=>{
        if(e.key==="Tab"){
            e.preventDefault()
            resetButton.current.focus();
        }
    }

    return (
        <>
            {/* <Loader loaded={loaderState} className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} position='relative' top="100px"> */}
                <div style={{marginTop:"-50px",marginLeft:"-100px",marginRight:"-100px"}}>
                    {/* <h2 className='text-center ' style={{color:"#ffeba7"}}>Test Completed !!!</h2> */}
                    <div>
                        <CurrentTestChart testChartStates={props.testChartStates} testTime={props.testTime} language={props.language}/>
                    </div>
                    <div className=" d-flex flex-row justify-content-around">
                        {/* <div className="t-card">                 
                        <div className="col text-center mt-4">
                        <h5 className="text-muted font-">Total Time</h5>
                        <h3 className='display-5'>{props.testTime}</h3>
                        <h5 className="text-muted font-">{props.language}</h5>
                        </div>
                        </div>    */}
                        <div className="t-card">
                        <div className="col text-center mt-4">
                        <h5 className="text-muted font-">wpm</h5>
                        <h2 className='display-3'>{props.speed}{isHighScore ? "*" : ""}</h2>
                        <h5 className={`text-muted font- ${userState.averageSpeed!==null?"":"d-none"}`}>avg {userState.averageSpeed}</h5>
                        </div>
                        </div>
                        {/* <div className="restartButton">
                        <button className='btn-2' ref={resetButton} onClick={()=>{resetLiveTest()}}>Next Test </button>
                        </div> */}
                        <div className='restartButton'>
                        <button type="button" className="btn btn-outline-secondary no-border"  ref={resetButton} onClick={()=>{resetLiveTest()}} ><UisArrowCircleRight size="70" color="#FFD750" /></button>
                        </div>
                        <div className="t-card">
                        <div className="col text-center mt-4">
                        <h5 className="text-muted font-">accuracy</h5>
                        <h2 className='display-3'>{props.accuracy}%</h2>
                        <h5 className={`text-muted font- ${userState.averageAccuracy!==null?"":"d-none"}`}>avg {userState.averageAccuracy}%</h5>
                        </div>
                        </div>
                </div>
            </div>
        {/* </Loader> */}
        </>
    )
}
