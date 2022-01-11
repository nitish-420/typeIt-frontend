import {React,useState,useEffect} from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import Loader from "react-loader"
import { removeGuest, setCurrentUser,showAlert } from '../actions/index'
import { useHistory } from 'react-router-dom'
import BestTable from "./BestTable"
import UserAllTestTable from './UserAllTestTable'

var userState
var guestState
var initialBestState={
    success:false,
    time15:null,
    time30:null,
    time60:null,
    time120:null
}
var backendUrl="https://type-it-backend.herokuapp.com/"

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
    
    const [englishBest,setEnglishBest]=useState({...initialBestState})
    const [pythonBest,setPythonBest]=useState({...initialBestState})
    const [cBest,setCBest]=useState({...initialBestState})
    const [javaBest,setJavaBest]=useState({...initialBestState})
    const [javascriptBest,setJavaScriptBest]=useState({...initialBestState})
    const [allTests,setAllTests]=useState([])

    const [madeAllRequest,setMadeAllRequest]=useState(false)

    useEffect(()=>{
    
    const getBestForEnglish=async()=>{
        try{
            
            const response= await fetch(`${backendUrl}api/test/getbest`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "auth-token":`${localStorage.getItem("token")}`
                },
                body:JSON.stringify({
                    "language":"English"
                })
            })
    
            const json=await response.json()
            if(json.success){

                setEnglishBest(()=>{
                    return {
                        ...json.final,
                        success:true
                    }
                })
            }
            else{
                setEnglishBest((prev)=>{
                    return {
                        ...prev,
                        success:true
                    }
                })
            }
        }
        catch(e){
            setEnglishBest((prev)=>{
                return {
                    ...prev,
                    success:true
                }
            })
            // console.log(e)
        }
        
    }
    const getBestForPython=async()=>{
        try{
            
            const response= await fetch(`${backendUrl}api/test/getbest`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "auth-token":`${localStorage.getItem("token")}`
                },
                body:JSON.stringify({
                    "language":"Python"
                })
            })
            
            const json=await response.json()
            if(json.success){

                setPythonBest(()=>{
                    return {
                        ...json.final,
                        success:true
                    }
                })
            }
            else{
                setPythonBest((prev)=>{
                    return {
                        ...prev,
                        success:true
                    }
                })
            }
        }
        catch(e){
            // console.log(e)
            setPythonBest((prev)=>{
                return {
                    ...prev,
                    success:true
                }
            })
            
        }
        
    }
    const getBestForC=async()=>{
        try{
            const response= await fetch(`${backendUrl}api/test/getbest`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "auth-token":`${localStorage.getItem("token")}`
                },
                body:JSON.stringify({
                    "language":"C"
                })
            })
        
            const json=await response.json()
            if(json.success){

                setCBest(()=>{
                    return {
                        ...json.final,
                        success:true
                    }
                })
            }
            else{
                setCBest((prev)=>{
                    return {
                        ...prev,
                        success:true
                    }
                })
            }
            
        }
        catch(e){
            // console.log(e)
            setCBest((prev)=>{
                return {
                    ...prev,
                    success:true
                }
            })
        }
        
    }

    const getBestForJava=async()=>{
        try{
            const response= await fetch(`${backendUrl}api/test/getbest`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "auth-token":`${localStorage.getItem("token")}`
                },
                body:JSON.stringify({
                    "language":"Java"
                })
            })
        
            const json=await response.json()
            if(json.success){

                setJavaBest(()=>{
                    return {
                        ...json.final,
                        success:true
                    }
                })
            }
            else{
            }
            
        }
        catch(e){
            // console.log(e)
            setJavaBest((prev)=>{
                return {
                    ...prev,
                    success:true
                }
            })
        }
        
    }

    const getBestForJavaScript=async()=>{
        try{
            const response= await fetch(`${backendUrl}api/test/getbest`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "auth-token":`${localStorage.getItem("token")}`
                },
                body:JSON.stringify({
                    "language":"Javascript"
                })
            })
        
            const json=await response.json()
            if(json.success){

                setJavaScriptBest(()=>{
                    return {
                        ...json.final,
                        success:true
                    }
                })
            }
            else{
            }
            
        }
        catch(e){
            setJavaScriptBest((prev)=>{
                return {
                    ...prev,
                    success:true
                }
            })
            // console.log(e)
        }
        
    }
    
    const getAllTestDetailOfUser= async ()=>{
        
        try{
            const response= await fetch(`${backendUrl}api/test/getuserall`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "auth-token":`${localStorage.getItem("token")}`
                }
            })
        
            const json=await response.json()
            if(json.success){
                if(json.result.length===0){
                    setAllTests([null])
                }
                else{
                    setAllTests(()=>{
                        return json.result
                    })
                }
            }
            else{
                setAllTests([null])
            }
            
        }
        catch(e){
            setAllTests([null])
            // console.log(e)
            
        }
    }



    const getBestForAll=async()=>{
        await getBestForEnglish()
        await getBestForPython()
        await getBestForC()
        await getBestForJava()
        await getBestForJavaScript()

    }

    const makeAllRequests = async()=>{
        await getBestForAll()
        await getAllTestDetailOfUser()
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
                dispatch(removeGuest())
                // if(json.user.status===0){
                //     dispatch(showAlert("Please verify your account, link has been sended again at your email, reload the page after verifing","danger",2000))
                // }
            }
            else{
                dispatch(showAlert(json.error,"danger"))
                history.push("/login")
            }
            setLoaderState(true)
            makeAllRequests()
        }
        catch(e){
            history.push("/login")
            dispatch(showAlert("Some error occured please try after some time, Sorry for the inconvenience","danger"))
        }
    }
    
    if(madeAllRequest===false){
        setMadeAllRequest(true)
        if(userState.id===null && localStorage.getItem("token")!==null){
            getCurrentUser()
        }
        else if (!guestState){
            makeAllRequests()
        }
        
    }
        
        return ()=>{
            //adding return will work as componentWillUnmount() ie. it will run when this component will unmount
            // setLoaderState(true)
        }
    },[dispatch,history,madeAllRequest])

    const getTimeInMinutes=(seconds)=>{
        let hours=Math.floor(seconds/3600)
        seconds=seconds%3600
        let minutes=Math.floor(seconds/60)
        seconds=seconds%60
        return ("0"+hours).slice(-2)+":"+("0"+minutes).slice(-2)+":"+("0"+seconds).slice(-2)
    }




    return (
        <Loader loaded={loaderState} className="spinner pb-5" color="#FFF" radius={10} width={3} trail={60} speed={1} position='relative' top='175px'>
            {!guestState ? <div className='mb-3'>
                <div className='row d-flex flex-row justify-content-around'>
                    <h2 className='col-12 text-center text-animation'>
                        Hii {userState.fName+" "+userState.lName } go down to trace your journey !!!
                    </h2>
                    <div className="container pb-4">
                        <div className="row p-4">
                            <div className="col text-center ">
                            <h6 className="text-muted font-">Total Test Given</h6>
                            <h2>{userState.numberOfTestsGiven}</h2>
                            </div>
                            <div className="col text-center">
                            <h6 className="text-muted font-">Total Time Spends</h6>
                            <h2>{getTimeInMinutes(userState.totalTimeSpend)}</h2>              
                            </div>
                            <div className="col text-center">
                            <h6 className="text-muted font-">Best Speed</h6>
                            <h2>{userState.bestSpeed}</h2>   
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-center">
                            <h6 className="text-muted font-">Acuuracy with Best Speed</h6>
                            <h2>{userState.bestAccuracy}</h2>   
                            </div>
                            <div className="col text-center">
                            <h6 className="text-muted font-">Average Speed</h6>
                            <h2>{userState.averageSpeed}</h2> 
                            </div>
                            <div className="col text-center">
                            <h6 className="text-muted font-">Average Accuracy</h6>
                            <h2>{userState.averageAccuracy}</h2>  
                            </div>
                        </div>
                        </div>
                    {/* <div>
                        {userState.email} is your email
                    </div> */}
                </div>

                <div className='row d-flex flex-row justify-content-around'>

                    <div className='col-10 col-lg-12 p-3' style={{minHeight:"300px"}}>
                        <h1 className='text-center' style={{color:"#ffeba7"}}>
                            English
                        </h1>
                        <Loader loaded={englishBest.success} className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} position='relative' top='100px'/>
                            <BestTable  bestData={englishBest}/>
                        {/* </Loader> */}
                    </div>
                    <div className='col-10 col-lg-6 p-3' style={{minHeight:"300px"}}>
                        <h1 className='text-center' style={{color:"#ffeba7"}}>
                            Python
                        </h1>
                        <Loader loaded={pythonBest.success} className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} position='relative' top='100px'/>
                            <BestTable  bestData={pythonBest}/>
                        {/* </Loader> */}
                    </div>
                    <div className='col-10 col-lg-6 p-3' style={{minHeight:"300px"}}>
                        <h1 className='text-center' style={{color:"#ffeba7"}}>
                            C/C++
                        </h1>

                        <Loader loaded={cBest.success} className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} position='relative' top='100px'/>
                            <BestTable  bestData={cBest}/>
                        {/* </Loader> */}
                    </div>
                    <div className='col-10 col-lg-6 p-3' style={{minHeight:"300px"}}>
                        <h1 className='text-center' style={{color:"#ffeba7"}}>
                            Java
                        </h1>
                        <Loader loaded={javaBest.success} className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} position='relative' top='100px'/>
                            <BestTable  bestData={javaBest}/>
                        {/* </Loader> */}
                    </div>
                    <div className='col-10 col-lg-6 p-3' style={{minHeight:"300px"}}>
                        <h1 className='text-center' style={{color:"#ffeba7"}}>
                            JavaScript
                        </h1>
                        <Loader loaded={javascriptBest.success} className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} position='relative' top='100px'/>
                            <BestTable  bestData={javascriptBest}/>
                        {/* </Loader> */}

                    </div>
                </div>
                <div className='p-4' style={{minHeight:"300px"}}>
                    <Loader loaded={allTests.length!==0} className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} position='relative' top='200px'  />
                        <UserAllTestTable  testData={allTests}/>
                    {/* </Loader> */}
                </div>
            </div> :
            <div>
                <h1 className='text-center'>
                    You are playing as a guest !!!
                </h1>
            </div>
            }
        </Loader>
    )
}
