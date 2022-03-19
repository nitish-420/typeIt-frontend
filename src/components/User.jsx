import {React,useState,useEffect} from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import Loader from "react-loader"
import { removeGuest, resetCurrentUser, setCurrentUser,setGuest,showAlert } from '../actions/index'
import { useHistory } from 'react-router-dom'
import BestTable from "./BestTable"
import UserAllTestTable from './UserAllTestTable'
import AllTestsChart from './AllTestsChart'

var userState
var guestState
var initialBestState={
    success:false,
    time15:null,
    time30:null,
    time60:null,
    time120:null
}
var backendUrl

export default function User() {
    
    const dispatch=useDispatch()

    let history=useHistory();
    
    guestState=useSelector((state)=>{
        return state.handleGuestState
    })


    if(guestState && !localStorage.getItem("token")){
        history.push("/login")
        dispatch(showAlert("Please Log In first.","warning","2500"))
    }
    
    userState=useSelector((state)=>{
        return state.handleUserState
    })


    backendUrl=useSelector((state)=>{
        return state.handleBackendUrlState
    })
    
    const [loaderState,setLoaderState]=useState(true)
    
    const [englishBest,setEnglishBest]=useState({...initialBestState})
    const [pythonBest,setPythonBest]=useState({...initialBestState})
    const [cBest,setCBest]=useState({...initialBestState})
    const [javaBest,setJavaBest]=useState({...initialBestState})
    const [javascriptBest,setJavaScriptBest]=useState({...initialBestState})
    const [allTests,setAllTests]=useState([])
    const [allTestsLoader,setAllTestsLoader]=useState(false)

    const [madeAllRequest,setMadeAllRequest]=useState(false)

    useEffect(()=>{
    
    const getBestForEnglish=async()=>{

        let finalBestState={
            success:true,
            time15:null,
            time30:null,
            time60:null,
            time120:null
        }

        userState.bests.forEach((data)=>{
            if(data.language==="English"){
                if(data.testTime===15){
                    finalBestState.time15=data
                }
                else if(data.testTime===30){
                    finalBestState.time30=data
                }
                else if(data.testTime===60){
                    finalBestState.time60=data
                }
                else if(data.testTime===120){
                    finalBestState.time120=data
                }
            }
            return;
        })

        setEnglishBest((prev)=>{
            return{...finalBestState}
        })
        
    }
    const getBestForPython=async()=>{
        
        let finalBestState={
            success:true,
            time15:null,
            time30:null,
            time60:null,
            time120:null
        }

        userState.bests.forEach((data)=>{
            if(data.language==="Python"){
                if(data.testTime===15){
                    finalBestState.time15=data
                }
                else if(data.testTime===30){
                    finalBestState.time30=data
                }
                else if(data.testTime===60){
                    finalBestState.time60=data
                }
                else if(data.testTime===120){
                    finalBestState.time120=data
                }
            }
            return;
        })

        setPythonBest((prev)=>{
            return{...finalBestState}
        })
        
    }
    const getBestForC=async()=>{
        
        let finalBestState={
            success:true,
            time15:null,
            time30:null,
            time60:null,
            time120:null
        }

        userState.bests.forEach((data)=>{
            if(data.language==="C"){
                if(data.testTime===15){
                    finalBestState.time15=data
                }
                else if(data.testTime===30){
                    finalBestState.time30=data
                }
                else if(data.testTime===60){
                    finalBestState.time60=data
                }
                else if(data.testTime===120){
                    finalBestState.time120=data
                }
            }
            return;
        })

        setCBest((prev)=>{
            return{...finalBestState}
        })
        
    }

    const getBestForJava=async()=>{
        
        let finalBestState={
            success:true,
            time15:null,
            time30:null,
            time60:null,
            time120:null
        }

        userState.bests.forEach((data)=>{
            if(data.language==="Java"){
                if(data.testTime===15){
                    finalBestState.time15=data
                }
                else if(data.testTime===30){
                    finalBestState.time30=data
                }
                else if(data.testTime===60){
                    finalBestState.time60=data
                }
                else if(data.testTime===120){
                    finalBestState.time120=data
                }
            }
            return;
        })

        setJavaBest((prev)=>{
            return{...finalBestState}
        })
        
    }

    const getBestForJavaScript=async()=>{
        
        let finalBestState={
            success:true,
            time15:null,
            time30:null,
            time60:null,
            time120:null
        }

        userState.bests.forEach((data)=>{
            if(data.language==="Javascript"){
                if(data.testTime===15){
                    finalBestState.time15=data
                }
                else if(data.testTime===30){
                    finalBestState.time30=data
                }
                else if(data.testTime===60){
                    finalBestState.time60=data
                }
                else if(data.testTime===120){
                    finalBestState.time120=data
                }
            }
            return;
        })

        setJavaScriptBest((prev)=>{
            return{...finalBestState}
        })
        
    }
    
    const getAllTestDetailOfUser= async ()=>{

        let temp=[...userState.tests]

        setAllTests((prev)=>{
            return temp.reverse()
        })
        setAllTestsLoader(true)
    }



    const getBestForAll=async()=>{
        try{
            await getBestForEnglish()
            await getBestForPython()
            await getBestForC()
            await getBestForJavaScript()
            await getBestForJava()
        }
        catch(e){
            // console.log(e)
            
        }

    }

    const makeAllRequests = async()=>{
        try{
            await getBestForAll()
            await getAllTestDetailOfUser()
        }
        catch(e){
            // console.log(e)
        }
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
            }
            else{
                dispatch(showAlert(json.error,"danger"))
                dispatch(setGuest())
                dispatch(resetCurrentUser())
                localStorage.removeItem("token")
                history.push("/login")
            }
            setLoaderState(true)
            makeAllRequests()
        }
        catch(e){
            // history.push("/login")
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
                        Hii {userState.fName+" "+userState.lName } scroll down to trace your journey !!!
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
                            <h6 className="text-muted font-">Average Speed (wpm)</h6>
                            <h2>{userState.averageSpeed}</h2> 
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-center">
                            <h6 className="text-muted font-">Best Speed (wpm)</h6>
                            <h2>{userState.bestSpeed}</h2>   
                            </div>
                            <div className="col text-center">
                            <h6 className="text-muted font-">Accuracy with Best Speed (%)</h6>
                            <h2>{userState.bestAccuracy}</h2>   
                            </div>
                            <div className="col text-center">
                            <h6 className="text-muted font-">Average Accuracy (%)</h6>
                            <h2>{userState.averageAccuracy}</h2>  
                            </div>
                        </div>
                        </div>
                </div>
                <div>
                    <AllTestsChart/>
                </div>
                <hr/>

                <div className='row d-flex flex-row justify-content-around'>

                    <div className='col-10 col-lg-12 p-3' style={{minHeight:"300px"}}>
                        <h2 className='text-center' style={{color:"#ffeba7"}}>
                            English bests
                        </h2>
                        <Loader loaded={englishBest.success} className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} position='relative' top='100px'/>
                            <BestTable  bestData={englishBest}/>
                        {/* </Loader> */}
                    </div>
                    <div className='col-10 col-lg-6 p-3' style={{minHeight:"300px"}}>
                        <h2 className='text-center' style={{color:"#ffeba7"}}>
                            Python bests
                        </h2>
                        <Loader loaded={pythonBest.success} className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} position='relative' top='100px'/>
                            <BestTable  bestData={pythonBest}/>
                        {/* </Loader> */}
                    </div>
                    <div className='col-10 col-lg-6 p-3' style={{minHeight:"300px"}}>
                        <h2 className='text-center' style={{color:"#ffeba7"}}>
                            C/C++ bests
                        </h2>

                        <Loader loaded={cBest.success} className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} position='relative' top='100px'/>
                            <BestTable  bestData={cBest}/>
                        {/* </Loader> */}
                    </div>
                    <div className='col-10 col-lg-6 p-3' style={{minHeight:"300px"}}>
                        <h2 className='text-center' style={{color:"#ffeba7"}}>
                            JavaScript bests
                        </h2>
                        <Loader loaded={javascriptBest.success} className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} position='relative' top='100px'/>
                            <BestTable  bestData={javascriptBest}/>

                    </div>
                    <div className='col-10 col-lg-6 p-3' style={{minHeight:"300px"}}>
                        <h2 className='text-center' style={{color:"#ffeba7"}}>
                            Java bests
                        </h2>
                        <Loader loaded={javaBest.success} className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} position='relative' top='100px'/>
                            <BestTable  bestData={javaBest}/>
                        {/* </Loader> */}
                    </div>
                </div>
                <hr/>
                <div className='p-4' style={{minHeight:"300px"}}>
                    <Loader loaded={allTestsLoader} className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} position='relative' top='200px'  />
                        <UserAllTestTable  testData={allTests}/>
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
