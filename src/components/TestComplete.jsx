import {React,useRef,useEffect,useState} from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import Loader from "react-loader"
import { setCurrentUser, showAlert } from '../actions'

var userState
var guestState
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
            let response=await fetch("http://localhost:5000/api/test/createtest",{
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
                
                response=await fetch("http://localhost:5000/api/auth/updateuser",{
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
        if(props.speed*props.accuracy<500){
            dispatch(showAlert("Invalid Test Case, It will not be stored in database","warning",2500))
            return false
        }
        return true
    }

    if(!guestState && savedThisTest===false && validTestCase()){
        setSavedThisTest(true)
        saveCurrentTestCase()
    }

    useEffect(()=>{
        setTimeout(()=>{
            if(resetButton.current){
                resetButton.current.focus()
            }
        },500)
    },[resetButton])

    return (
        <Loader loaded={loaderState} className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} top="30%">
            {loaderState && <div>
                <div>
                    {props.testTime}
                </div>
                <div>
                    {props.speed}
                </div>
                <div>
                    {props.accuracy}
                </div>
                Test completed !!!
                <hr/>
                <button className='btn btn-secondary' ref={resetButton} onClick={()=>{resetLiveTest()}}>Next Test </button>

            </div>}
        </Loader>
    )
}
