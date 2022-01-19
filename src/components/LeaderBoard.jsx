/* eslint-disable jsx-a11y/anchor-is-valid */
import {React,useState,useEffect} from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import Loader from "react-loader"
import LeaderBoardTable from "./LeaderBoardTable"
import { useHistory } from 'react-router-dom'
import { removeGuest, resetCurrentUser, setCurrentUser,setGuest,showAlert } from '../actions/index'


var userState
var backendUrl

export default function LeaderBoard() {

    const dispatch=useDispatch()

    let history=useHistory();

    const [language,setLanguage]=useState("English")

    const [leaderBoardData,setLeaderBoardData]=useState({success:false})
    
    userState=useSelector((state)=>{
        return state.handleUserState
    })


    backendUrl=useSelector((state)=>{
        return state.handleBackendUrlState
    })

    useEffect(()=>{

        const getLeaderBoardForLanguage=async()=>{
            try{
                const response= await fetch(`${backendUrl}api/test/getall`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        "language":`${language}`
                    })
                })

                const json=await response.json()

                if(json.success){
                    // console.log(json)
                    var final={
                        time15:[],
                        time30:[],
                        time60:[],
                        time120:[]
                    }
                    await json.leaderboardData.forEach((data)=>final[`time${data.time}`]=data.tests)

                    final.time15.sort((a,b)=>{
                        if(a.speed===b.speed){
                            if(a.accuracy===b.accuracy){
                                let datea=new Date(a.timeOfTest).getTime()
                                let dateb=new Date(b.timeOfTest).getTime()
                                return datea-dateb
                            }
                            return b.accuracy-a.accuracy
                        }
                        return b.speed-a.speed
                    })
                    final.time30.sort((a,b)=>{
                        if(a.speed===b.speed){
                            if(a.accuracy===b.accuracy){
                                return a.timeOfTest-b.timeOfTest
                            }
                            return b.accuracy-a.accuracy
                        }
                        return b.speed-a.speed
                    })
                    final.time60.sort((a,b)=>{
                        if(a.speed===b.speed){
                            if(a.accuracy===b.accuracy){
                                return a.timeOfTest-b.timeOfTest
                            }
                            return b.accuracy-a.accuracy
                        }
                        return b.speed-a.speed
                    })
                    final.time120.sort((a,b)=>{
                        if(a.speed===b.speed){
                            if(a.accuracy===b.accuracy){
                                return a.timeOfTest-b.timeOfTest
                            }
                            return b.accuracy-a.accuracy
                        }
                        return b.speed-a.speed
                    })

                    setLeaderBoardData(()=>{
                        return {
                            ...final,
                            success:true
                        }
                    })
                }
                else{
                    setLeaderBoardData({success:false})
                }
            }
            catch(e){
                // console.log(e)
                setLeaderBoardData({success:false})
            }
        }


        const getCurrentUser = async()=>{
            try{
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
                getLeaderBoardForLanguage()
            }
            catch(e){
                // history.push("/login")
                dispatch(showAlert("Some error occured please try after some time, Sorry for the inconvenience","danger"))

            }
        }

        setLeaderBoardData({success:false})

        if(userState.id===null && localStorage.getItem("token")!==null){
            getCurrentUser()
        }
        else{
            getLeaderBoardForLanguage()
        }
        


    },[language,dispatch,history])

    return (
        <div className='mb-5'>
            <div className='row d-flex flex-row justify-content-around'>
                <div className='col-12 col-md-9 p-3 align-self-center text-center text-md-start'>
                    <h1 style={{color:"#ffeba7"}}>Leader Board</h1>
                </div>
                <div className="dropdown col-12 col-md-3  p-3 text-center text-md-end">
                    <button className="btn-2 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {language}{language==="C"?"/C++":""}
                    </button>
                    <ul className="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton1" >
                        <li> <a className='dropdown-item text-light bg-dark'  onClick={()=>setLanguage("English")}>English</a></li>
                        <li> <a className='dropdown-item text-light bg-dark'  onClick={()=>setLanguage("Python")}>Python</a></li>
                        <li> <a className='dropdown-item text-light bg-dark'  onClick={()=>setLanguage("C")}>C/C++</a></li>
                        <li> <a className='dropdown-item text-light bg-dark'  onClick={()=>setLanguage("Javascript")}>JavaScript</a></li>
                        <li> <a className='dropdown-item text-light bg-dark'  onClick={()=>setLanguage("Java")}>Java</a></li>
                    </ul>
                </div>
            </div>

            <div>

                <Loader loaded={leaderBoardData.success} className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} position='relative' top='150px'>
                    <div className='row d-flex flex-row justify-content-around'>
                        <div className='col-10 col-lg-6 p-3'>
                            <LeaderBoardTable language={language} time={15} leaderBoardData={leaderBoardData.time15}/>
                        </div>
                        <div className='col-10 col-lg-6 p-3'>
                            <LeaderBoardTable language={language} time={30} leaderBoardData={leaderBoardData.time30}/>
                        </div>
                        <div className='col-10 col-lg-6 p-3'>
                            <LeaderBoardTable language={language} time={60} leaderBoardData={leaderBoardData.time60}/>
                        </div>
                        <div className='col-10 col-lg-6 p-3'>
                            <LeaderBoardTable language={language} time={120} leaderBoardData={leaderBoardData.time120}/>
                        </div>
                    </div>
                </Loader>
            </div>
        </div>
    )
}
