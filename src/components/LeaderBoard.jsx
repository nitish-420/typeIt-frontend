/* eslint-disable jsx-a11y/anchor-is-valid */
import {React,useState,useEffect} from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import Loader from "react-loader"
import LeaderBoardTable from "./LeaderBoardTable"
import { useHistory } from 'react-router-dom'
import { setCurrentUser,showAlert } from '../actions/index'


var userState
var guestState
var backendUrl="https://type-it-backend.herokuapp.com/"

export default function LeaderBoard() {

    const dispatch=useDispatch()

    let history=useHistory();

    const [language,setLanguage]=useState("English")

    const [leaderBoardData,setLeaderBoardData]=useState({success:false})

    guestState=useSelector((state)=>{
        return state.handleGuestState
    })
    
    userState=useSelector((state)=>{
        return state.handleUserState
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
                    setLeaderBoardData(()=>{
                        return {
                            ...json.final,
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
                }
                else{
                    dispatch(showAlert(json.error,"danger"))
                    history.push("/login")
                }
                getLeaderBoardForLanguage()
            }
            catch(e){
                history.push("/login")
    
            }
        }

        setLeaderBoardData({success:false})

        if(userState.id===null && !guestState){
            getCurrentUser()
        }
        else{
            getLeaderBoardForLanguage()
        }
        


    },[language,dispatch,history])

    return (
        <>
            <div className='row d-flex flex-row justify-content-around'>
                <div className='col-12 col-md-9 p-3 align-self-center text-center text-md-start'>
                    <h1>Leader Board</h1>
                </div>
                <div className="dropdown col-12 col-md-3  p-3 text-center text-md-end">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {language}
                    </button>
                    <ul className="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton1" >
                        <li> <a className='dropdown-item text-light bg-dark'  onClick={()=>setLanguage("English")}>English</a></li>
                        <li> <a className='dropdown-item text-light bg-dark'  onClick={()=>setLanguage("Python")}>Python</a></li>
                        <li> <a className='dropdown-item text-light bg-dark'  onClick={()=>setLanguage("C")}>C</a></li>
                        <li> <a className='dropdown-item text-light bg-dark'  onClick={()=>setLanguage("Java")}>Java</a></li>
                        <li> <a className='dropdown-item text-light bg-dark'  onClick={()=>setLanguage("Javascript")}>JavaScript</a></li>
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
        </>
    )
}
