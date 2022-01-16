import React,{useState,useEffect,useRef} from "react"
import {useHistory} from 'react-router-dom'
import { showAlert,removeGuest, setCurrentUser } from "../actions"
import { useDispatch } from "react-redux";
import Loader from "react-loader"
import { useSelector } from "react-redux";

var backendUrl

export default function Login() {

    
    const dispatch=useDispatch()

    let history=useHistory()

    localStorage.removeItem("token")


    backendUrl=useSelector((state)=>{
        return state.handleBackendUrlState
    })

    const loginPasswordInputReference=useRef(null)
    const signupPasswordInputReference=useRef(null)
    const loginButtonReference=useRef(null)
    const signupButtonReference=useRef(null)
    
    const [loaderState,setLoaderState]=useState(true)


    const [loginData,setLoginData] =useState(
        {
        luserName:"",
        lpassword:""
        }
    )

    const [forgotData,setForgotData] =useState(
        {
        forgotemail:""
        }
    )
    const [signUpData,setSignUpData] =useState(
        {
        fName:"",
        lName:"",
        userName:"",
        email:"",
        password:""
    }
    )

    useEffect(()=>{

        setLoaderState(true)

        return ()=>{
            setLoaderState(true)
        }
    },[])

    function handleLoginChange(event){
        const {name,value}=event.target
        setLoginData((prev)=>{
            return {
                ...prev,
                [name]:value
            }

        })
    }
    function handleSignUpChange(event){
        const {name,value}=event.target
        setSignUpData((prev)=>{
            return {
                ...prev,
                [name]:value
            }

        })
    }
    
    function handleForgotEmailChange(event){
        const {name,value}=event.target
        setForgotData((prev)=>{
            return {
                ...prev,
                [name]:value
            }
    
        })
        
    }


    function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
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

    function validateUserName(userName){
        if(userName.length<3 || userName.length>20){
            return false;
        }
        return true

    }

    const clickedLogin=async (event)=>{
        event.preventDefault()
        let userName=loginData.luserName.trim()
        let password=loginData.lpassword.trim()
        if(!validateUserName(userName)){
            dispatch(showAlert("Length of userName should be between 3-20","danger"))
        }
        else if(password.length<5){
            dispatch(showAlert("Invalid credentials","danger"))
            
        }
        else{
            setLoaderState(false)
            try{
                const response=await fetch(`${backendUrl}api/auth/login`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({userName,password})
                });
                const json=await response.json()
                if(json.success){
                    localStorage.setItem('token',json.authtoken)
                    dispatch(showAlert(`Welcome ${json.user.userName}` ,"success"))
                    dispatch(removeGuest())
                    dispatch(setCurrentUser(json.user))
                    history.push("/");
                }
                else{
                    if(json.error){
                        dispatch(showAlert(json.error,"danger",4000));
                    }
                    else{
                        dispatch(showAlert("Invalid credentials","danger"))
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
    
    const handleForgotPasswordRequest=async (event)=>{
        event.preventDefault()
        let email=forgotData.forgotemail.trim()
        if(!validateEmail(email)){
            dispatch(showAlert("Please enter a valid email to reset password","danger"))
        }
        else{
            setLoaderState(false)
            try{
                const response=await fetch(`${backendUrl}api/auth/forgotpassword`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({email})
                });
                const json=await response.json()
                if(json.success){
                    dispatch(showAlert("New Password has been sent to your email, please check spam box too","success"))
                }
                else{
                    if(json.error){
                        dispatch(showAlert(json.error,"danger",4000));
                    }
                    else{
                        dispatch(showAlert("Invalid credentials","danger"))
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

    const clickedSignUp=async (event)=>{
        event.preventDefault()
        let fName=signUpData.fName.trim()
        let lName=signUpData.lName.trim()
        let userName=signUpData.userName.trim()
        let email=signUpData.email.trim()
        let password=signUpData.password.trim()
        
        if(!validateName(fName,lName)){
            dispatch(showAlert("Length of Name should be between 3-20 and should contains only alphabets","danger",2000))
        }
        else if(!validateUserName(userName)){
            dispatch(showAlert("Length of username should be between 3-20","danger",2000))

        }
        else if(!validateEmail(email)){
            dispatch(showAlert("Please enter a valid email","danger",2000))
        }
        else if(password.length<5){
            dispatch(showAlert("Password should be atleast 5 characters","danger",2000))  
        }
        else{
            setLoaderState(false)
            try{
                const response=await fetch(`${backendUrl}api/auth/createuser`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({fName,lName,userName,email,password})
                });
                const json=await response.json()
                if(json.success){
                    // localStorage.setItem('token',json.authtoken)
                    dispatch(showAlert("Signed up successfully, please verify your email by clicking on link sended at your email and then login","success",4000))
                    setLoginData((prev)=>{
                        return {
                            "luserName":userName,
                            "lpassword":password
                        }
                    })
                    setSignUpData((prev)=>{
                        return {
                        fName:"",
                        lName:"",
                        userName:"",
                        email:"",
                        password:""
                        }
                    })
                }
                else if(json.error){
                    dispatch(showAlert(json.error,"danger"))
                    // console.log(json)
                }
                else{
                    dispatch(showAlert("Something went wrong","danger"))
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
        <div className="section bg-dark mb-0">
            <div className="container pt-0">
                <div className="row  justify-content-center">
                    <div className="col-12 text-center align-self-start ">
                        <div className="section  pt-0 text-center" >
                            {/* <Link className="btn-2 no btn-2-outline-warning mb-3 text-decoration-none" onClick={()=>dispatch(setGuest())} to="/"> Continue as a guest !</Link> */}
                            <Loader loaded={loaderState}  className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} position="relative" top="125px">
                                <h6 className="mb-0 pb-3 fs-4"><span>Log In </span>&nbsp; &nbsp; &nbsp;<span>Sign Up</span></h6>
                                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                                <label htmlFor="reg-log" ></label>
                                <div className="card-3d-wrap mx-auto my-4 py-0" style={{height:"475px"}}>
                                    <div className="card-3d-wrapper " >
                                        <div className="card-front ">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Log In</h4>
                                                    <div className="form-group">
                                                        <input type="text" onChange={handleLoginChange} name="luserName" className="form-style" placeholder="Your User name" id="luserName" value={loginData.luserName} />
                                                        <i className="input-icons uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-4">
                                                        <input ref={loginPasswordInputReference} type="password" onChange={handleLoginChange} name="lpassword" className="form-style" placeholder="Your Password" id="lpassword"  value={loginData.lpassword} onKeyPress={(key)=>(key.code==="Enter" && loginButtonReference.current.click() )}/>
                                                        <i className="input-icons uil uil-lock-alt"></i>
                                                    </div>
                                                    <button ref={loginButtonReference}  className="btn-2 btn-2-outline-warning mt-4 mb-5"  onClick={clickedLogin} >Log In</button>
                                                </div>
                                                <button  type="button" className="btn-2 btn-2-outline-warning mt-5"  data-bs-toggle="modal" data-bs-target="#exampleModal" >Forgot password?</button>
                                            </div>
                                        </div>
                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3" >Sign Up</h4>
                                                    <div className="form-group ">
                                                        <input type="text" onChange={handleSignUpChange} name="userName" className="form-style" placeholder="Your User Name" id="userName" value={signUpData.userName}  />
                                                        <i className="input-icons uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="text" onChange={handleSignUpChange} name="fName" className="form-style" placeholder="Your First Name" id="fName" value={signUpData.fName} />
                                                        <i className="input-icons uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="text" onChange={handleSignUpChange} name="lName" className="form-style" placeholder="Your Last Name (optional)" id="lName" value={signUpData.lName}  />
                                                        <i className="input-icons uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="email"  onChange={handleSignUpChange} name="email" className="form-style" placeholder="Your Email" id="email" value={signUpData.email}  />
                                                        <i className="input-icons uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input ref={signupPasswordInputReference} type="password" onChange={handleSignUpChange} name="password" className="form-style" placeholder="Your Password" id="password" value={signUpData.password} onKeyPress={(key)=>(key.code==="Enter" && signupButtonReference.current.click() )} />
                                                        <i className="input-icons uil uil-lock-alt"></i>
                                                    </div>
                                                    <button ref={signupButtonReference} className="btn-2 btn-2-outline-warning mt-4" onClick={clickedSignUp} >Sign Up</button>
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
                                                <h4 className="mb-4 pb-3">Email</h4>
                                                <div className="form-group">
                                                    <input type="email" onChange={handleForgotEmailChange} name="forgotemail" className="form-style" placeholder="Your Email" id="forgotemail" value={forgotData.forgotemail} />
                                                    <i className="input-icons uil uil-at"></i>
                                                </div>
                                                <button  className="btn-2 btn-2-outline-warning mt-4 mb-5"  data-bs-dismiss="modal" onClick={handleForgotPasswordRequest} >Send Password</button>
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
    );
}
