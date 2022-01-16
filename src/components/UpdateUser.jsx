import React,{useState,useEffect} from "react"
import {useHistory} from 'react-router-dom'
import { resetCurrentUser, setCurrentUser, setGuest, showAlert } from "../actions"
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader"


var backendUrl

var userState;
var guestState

export default function UpdateUser() {

    
    const dispatch=useDispatch()

    let history=useHistory()

    userState=useSelector((state)=>{
        return state.handleUserState
    })

    if(userState.userName===null){
        history.push("/user")
    }

    guestState=useSelector((state)=>{
        return state.handleGuestState
    })

    backendUrl=useSelector((state)=>{
        return state.handleBackendUrlState
    })
    
    const [loaderState,setLoaderState]=useState(true)



    const [passwordData,setPasswordData] =useState(
        {
        currPassword:"",
        updatedPassword:""
        }
    )

    const [deleteData,setDeleteData] =useState(
        {
        delPassword:"",
        }
    )

    const [nameData,setNameData] =useState(
        {
        fName:userState.fName,
        lName:userState.lName,
        userName:userState.userName
    }
    )



    useEffect(()=>{
        setLoaderState(true)
        return ()=>{
            setLoaderState(true)
        }
    },[])

    function handlePasswordChange(event){
        const {name,value}=event.target
        setPasswordData((prev)=>{
            return {
                ...prev,
                [name]:value
            }

        })
    }
    function handleNamesChange(event){
        const {name,value}=event.target
        setNameData((prev)=>{
            return {
                ...prev,
                [name]:value
            }

        })
    }

    function handleDeleteChange(event){
        const {name,value}=event.target
        setDeleteData((prev)=>{
            return {
                ...prev,
                [name]:value
            }

        })
    }

    function validateName(fName,lName){
        if(fName.length<3 || fName.length>20){
            return false;
        }
        for(let i=0;i<fName.length;i++){
            if(fName[i].toLowerCase()===fName[i].toUpperCase()){
                return false;
            }
        }
        for(let i=0;i<lName.length;i++){
            if(lName[i].toLowerCase()===lName[i].toUpperCase()){
                return false;
            }
        }
        return true

    }

    const clickedChangePassword=async (event)=>{
        event.preventDefault()
        let currPassword=passwordData.currPassword.trim()
        let updatedPassword=passwordData.updatedPassword.trim()

        if(updatedPassword.length<5){
            dispatch(showAlert("Password should be atleast of 5 characters","danger"))
        }
        else{
            setLoaderState(false)
            try{
                const response=await fetch(`${backendUrl}api/auth/updatepassword`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        "auth-token":`${localStorage.getItem("token")}`
                    },
                    body:JSON.stringify({currPassword,updatedPassword})
                });
                const json=await response.json()
                if(json.success){
                    dispatch(showAlert("Password Updated Successfully","success"))
                    history.push("/user");
                }
                else{
                    if(json.error){
                        dispatch(showAlert(json.error,"danger",4000));
                    }
                    else{
                        dispatch(showAlert("Something went wrong","danger"))
                    }
                }
            }
            catch(e){
                // console.log(e)
                dispatch(showAlert("Some error occured please try after some time, Sorry for the inconvenience","danger"))
            }
            setLoaderState(true)
        }   
    }

    const handleDeleteAccount = async(event)=>{
        event.preventDefault()
        let currPassword=deleteData.delPassword.trim()

        if(currPassword.length<5 || currPassword.length>15){
            dispatch(showAlert("Invalid credentials","danger"))
        }
        else{
            setLoaderState(false)
            try{
                const response=await fetch(`${backendUrl}api/auth/deleteuser`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        "auth-token":`${localStorage.getItem("token")}`
                    },
                    body:JSON.stringify({currPassword})
                });
                const json=await response.json()
                if(json.success){
                    dispatch(showAlert("Account deleted successfully","warning"))
                    history.push("/login");
                    localStorage.removeItem("token")
                    dispatch(setGuest())
                    dispatch(resetCurrentUser())
                }
                else{
                    if(json.error){
                        dispatch(showAlert(json.error,"danger",4000));
                    }
                    else{
                        dispatch(showAlert("Something went wrong","danger"))
                    }
                }
            }
            catch(e){
                // console.log(e)
                dispatch(showAlert("Some error occured please try after some time, Sorry for the inconvenience","danger"))
            }
            setLoaderState(true)
        }   
    }

    const clickedChangeNames=async (event)=>{
        event.preventDefault()
        let fName=nameData.fName.trim()
        let lName=nameData.lName.trim()
        let userName=nameData.userName.trim()
        
        if(!validateName(fName,lName)){
            dispatch(showAlert("Length of Name should be between 3-20 and should contains only alphabets","danger",2000))
        }
        else if(userName.length<3 || userName.length>15){
            dispatch(showAlert("Length of username should be between 3-15","danger",2000))
        }
        else if(userState.userName===userName && userState.lName===lName && userState.fName===fName){
            dispatch(showAlert("Updated name successfully","success"))
            history.push("/user")
        }
        else{
            setLoaderState(false)
            try{
                const response=await fetch(`${backendUrl}api/auth/updateusernames`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        "auth-token":`${localStorage.getItem("token")}`
                    },
                    body:JSON.stringify({fName,lName,userName})
                });
                const json=await response.json()
                if(json.success){
                    const updatedUser={
                        ...userState,
                        fName:fName,
                        lName:lName,
                        userName:userName
                    }
                    dispatch(setCurrentUser(updatedUser))
                    dispatch(showAlert("Updated name successfully","success"))
                    history.push("/user")
                }
                else{
                    if(json.error){
                        dispatch(showAlert(json.error,"danger",4000));
                    }
                    else{
                        dispatch(showAlert("Something went wrong","danger"))
                    }
                }
            }
            catch(e){
                // console.log(e)
                dispatch(showAlert("Some error occured please try after some time, Sorry for the inconvenience","danger"))
            }
            setLoaderState(true)
        }
        
        
    }

    
    return (
        <>
        {guestState
            ? 
            <h1>You are playing as a guest !!!</h1>
            :
            <div className="section bg-dark mb-0">
            <div className="container pt-0">
                <div className="row  justify-content-center">
                    <div className="col-12 text-center align-self-start ">
                        <div className="section  pt-0 text-center">
                            {/* <Link className="btn-2 no btn-2-outline-warning mb-3 text-decoration-none" onClick={()=>dispatch(setGuest())} to="/"> Continue as a guest !</Link> */}
                            <Loader loaded={loaderState}  className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} position="relative" top="125px">
                                <h6 className="mb-0 pb-3 fs-4"><span>Names </span>&nbsp; &nbsp; &nbsp;<span>Password</span></h6>
                                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                                <label htmlFor="reg-log" ></label>
                                <div className="card-3d-wrap mx-auto my-4 py-0" style={{height:"475px"}}>
                                    <div className="card-3d-wrapper " >
                                        <div className=" card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3" >Change Names</h4>
                                                    <div className="form-group ">
                                                        <input type="text" onChange={handleNamesChange} name="userName" className="form-style" placeholder="Your User Name" id="userName" value={nameData.userName}  />
                                                        <i className="input-icons uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="text" onChange={handleNamesChange} name="fName" className="form-style" placeholder="Your First Name" id="fName" value={nameData.fName} />
                                                        <i className="input-icons uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="text" onChange={handleNamesChange} name="lName" className="form-style" placeholder="Your Last Name" id="lName" value={nameData.lName}  />
                                                        <i className="input-icons uil uil-user"></i>
                                                    </div>
                                                    <button className="btn-2 btn-2-outline-warning mt-4 mb-4" onClick={clickedChangeNames} >Change Names</button>
                                                </div>
                                                <button  type="button" className="btn-2 btn-2-outline-warning mt-5"  data-bs-toggle="modal" data-bs-target="#exampleModal" >Delete Account</button>
                                            </div>
                                        </div>
                                        <div className="card-back ">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Change Password</h4>
                                                    <div className="form-group">
                                                        <input type="password" onChange={handlePasswordChange} name="currPassword" className="form-style" placeholder="Current Password" id="currPassword" value={passwordData.currPassword} />
                                                        <i className="input-icons uil uil-lock-alt"></i>
                                                    </div>
                                                    <div className="form-group mt-4">
                                                        <input type="password" onChange={handlePasswordChange} name="updatedPassword" className="form-style" placeholder="New Password" id="updatedPassword"  value={passwordData.updatedPassword} />
                                                        <i className="input-icons uil uil-lock-alt"></i>
                                                    </div>
                                                    <button  className="btn-2 btn-2-outline-warning mt-4"  onClick={clickedChangePassword} >Change Password</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Loader>
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                <div className=" mx-auto my-auto">
                                <div className="card-front">
                                <div className="card-3d-wrapper  ">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Password</h4>
                                                <div className="form-group">
                                                    <input type="password" onChange={handleDeleteChange} name="delPassword" className="form-style" placeholder="Enter Your Password" id="delPassword" value={deleteData.delPassword} />
                                                    <i className="input-icons uil uil-lock-alt"></i>
                                                </div>
                                                <button  className="btn-2 btn-2-outline-warning mt-4 mb-5"  data-bs-dismiss="modal" onClick={handleDeleteAccount}  >Delete My Account</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    </>
    );
}
