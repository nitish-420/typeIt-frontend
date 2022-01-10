import {React,useRef,useState} from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import Loader from "react-loader"
import { setCurrentUser, showAlert } from '../actions'

var userState
var guestState
var backendUrl="https://type-it-backend.herokuapp.com/"

export default function TestComplete(props) {
    
    const {resetLiveTest}=props

    const dispatch=useDispatch()

    const resetButton=useRef(null)
    
    const [savedThisTest,setSavedThisTest]=useState(false)

    guestState=useSelector((state)=>{
        return state.handleGuestState
    })
    
    userState=useSelector((state)=>{
        return state.handleUserState
    })
    
    const [loaderState,setLoaderState]=useState(true)
    
    const saveCurrentTestCase=async ()=>{
        try{
            setLoaderState(false)
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
                    "language":`${props.language}`
                })

            })

            let json=await response.json()

            if(json.success){
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
                
                response=await fetch(`${backendUrl}api/auth/updateuser`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        "auth-token":`${localStorage.getItem("token")}`
                    },
                    body:JSON.stringify({
                        "numberOfTestsGiven":`${updatedUser.numberOfTestsGiven}`,
                        "totalTimeSpend":`${updatedUser.totalTimeSpend}`,
                        "bestSpeed":`${updatedUser.bestSpeed}`,
                        "averageSpeed":`${updatedUser.averageSpeed}`,
                        "bestAccuracy":`${updatedUser.bestAccuracy}`,
                        "averageAccuracy":`${updatedUser.averageAccuracy}`
                    })
                    
                }) 

                json=await response.json();
                if(json.success){
                    dispatch(setCurrentUser(updatedUser))
                }
                else{
                    dispatch(showAlert(json.error,"danger"))
                }
            }
            else{
                dispatch(showAlert(json.error,"danger"))
            }
            
            setLoaderState(true)
        }
        catch(e){
            dispatch(showAlert("Something went wrong this test case is not submitted, sorry for the inconvenience","danger"))
            setLoaderState(true)
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

    return (
            <Loader loaded={loaderState} className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} position='relative' top="100px">
                <div style={{marginTop:"-50px",marginLeft:"-50px",marginRight:"-50px"}}>
                    <h2 className='text-center ' style={{color:"#ffeba7"}}>Test Completed !!!</h2>
                    <div className=" d-flex flex-row justify-content-around">
                        <div className="t-card">                 
                        <div className="col text-center mt-4">
                        <h5 className="text-muted font-">Total Time</h5>
                        <h2 className='display-1'>{props.testTime}</h2>
                        </div>
                        </div>   
                        <div className="t-card">
                        <div className="col text-center mt-4">
                        <h5 className="text-muted font-">Speed (wpm)</h5>
                        <h2 className='display-1'>{props.speed}{userState.bestSpeed===props.speed && userState.bestAccuracy===props.accuracy ? "*" : ""}</h2>
                        <h5 className="text-muted font-">Avg {userState.averageSpeed}</h5>
                        </div>
                        </div>
                        <div className="t-card">
                        <div className="col text-center mt-4">
                        <h5 className="text-muted font-">Accuracy (%)</h5>
                        <h2 className='display-1'>{props.accuracy}</h2>
                        <h5 className="text-muted font-">Avg {userState.averageAccuracy}</h5>
                        </div>
                        </div>
                </div>
                <div className="restartButton">
                <button className='btn-2' ref={resetButton} onClick={()=>{resetLiveTest()}}>Next Test </button>
                </div>
            </div>
        </Loader>
    )
}
