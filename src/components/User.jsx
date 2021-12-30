import {React,useState,useEffect} from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import Loader from "react-loader"
import { setCurrentUser,showAlert } from '../actions/index'
import { useHistory } from 'react-router-dom'

var userState
var guestState

export default function User() {
    
    const dispatch=useDispatch()

    let history=useHistory();

    guestState=useSelector((state)=>{
        return state.handleGuestState
    })

    userState=useSelector((state)=>{
        return state.handleUserState
    })

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

            }
        }
        if(userState.id==null && !guestState){
            getCurrentUser()
        }
        
        
        return ()=>{
            //adding return will work as componentWillUnmount() ie. it will run when this component will unmount
            setLoaderState(true)
        }
    },[dispatch,history])




    return (
        <Loader loaded={loaderState} className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} top="30%">
            {!guestState ? <div>

                <div>
                    {userState.userName} is your Username
                </div>
                <div>
                    {userState.fName+" "+userState.lName} is your fullname
                </div>
                <div>
                    {userState.email} is your email
                </div>
                <div>
                    {userState.numberOfTestsGiven} is number of test you have given
                </div>
                <div>
                    {userState.totalTimeSpend} seconds is total time you have spend on this site 
                </div>
                <div>
                    {userState.bestSpeed} is your best speed sofar
                </div>
                <div>
                    {userState.bestAccuracy} is your accuracy in test with best speed
                </div>
                <div>
                    {userState.averageSpeed} is your average wpm speed 
                </div>
                <div>
                    {userState.averageAccuracy} is your average accuracy
                </div>
            </div> :
            <div>
                You are playing as a guest !!!
            </div>
            }
        </Loader>
    )
}
