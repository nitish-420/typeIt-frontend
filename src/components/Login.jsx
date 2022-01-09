import React,{useState,useEffect} from "react"
import {useHistory} from 'react-router-dom'
import { showAlert,removeGuest } from "../actions"
import { useDispatch } from "react-redux";
import Loader from "react-loader"


var backendUrl="https://type-it-backend.herokuapp.com/"

export default function Login() {

    
    const dispatch=useDispatch()

    let history=useHistory()

    localStorage.removeItem("token")

    const [loaderState,setLoaderState]=useState(true)

    const [loginData,setLoginData] =useState(
        {
        lemail:"",
        lpassword:""
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


    function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const clickedLogin=async (event)=>{
        event.preventDefault()
        let email=loginData.lemail.trim()
        let password=loginData.lpassword.trim()
        if(!validateEmail(email)){
            dispatch(showAlert("Please enter a valid email","danger"))
        }
        else if(password.length<5){
            dispatch(showAlert("Invalid credentials","danger"))
            
        }
        else{
            try{
                setLoaderState(false)
                const response=await fetch(`${backendUrl}api/auth/login`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({email,password})
                });
                const json=await response.json()
                if(json.success){
                    localStorage.setItem('token',json.authtoken)
                    dispatch(showAlert("Welcome back","success"))
                    dispatch(removeGuest())
                    history.push("/");
                }
                else{
                    dispatch(showAlert("Invalid credentials","danger"))
                    setLoaderState(true)
                }
            }
            catch(e){
                // console.log(e)
                setLoaderState(true)
                dispatch(showAlert("Some error occured please try after some time, Sorry for the inconvenience","danger"))

            }
        }
        
        
    }

    const clickedSignUp=async (event)=>{
        event.preventDefault()
        let fName=signUpData.fName.trim()
        let lName=signUpData.lName.trim()
        let userName=signUpData.userName.trim()
        let email=signUpData.email.trim()
        let password=signUpData.password.trim()
        
        if(fName.length<3){
            dispatch(showAlert("Name should be atleast three characters","danger"))
        }
        else if(!validateEmail(email)){
            dispatch(showAlert("Please enter a valid email","danger"))
        }
        else if(password.length<5){
            dispatch(showAlert("Password should be atleast 5 characters","danger"))
            
        }
        else{
            try{
                setLoaderState(false)
                const response=await fetch(`${backendUrl}api/auth/createuser`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({fName,lName,userName,email,password})
                });
                const json=await response.json()
                if(json.success){
                    localStorage.setItem('token',json.authtoken)
                    dispatch(showAlert("Signed up successfully","success"))
                    dispatch(removeGuest())
                    history.push("/");
                }
                else{
                    dispatch(showAlert("Invalid credentials","danger"))
                    setLoaderState(true)
                }
            }
            catch(e){
                // console.log(e)
                dispatch(showAlert("Some error occured please try after some time, Sorry for the inconvenience","danger"))
                setLoaderState(true)

            }
        }
        
        
    }

    
    return (
        <div className="section bg-dark mb-0">
            <div className="container pt-0">
                <div className="row  justify-content-center">
                    <div className="col-12 text-center align-self-start ">
                        <div className="section  pt-0 text-center">
                            {/* <Link className="btn-2 no btn-2-outline-warning mb-3 text-decoration-none" onClick={()=>dispatch(setGuest())} to="/"> Continue as a guest !</Link> */}
                            <h6 className="mb-0 pb-3 fs-4"><span>Log In </span>&nbsp; &nbsp; &nbsp;<span>Sign Up</span></h6>
                            <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                            <label htmlFor="reg-log"></label>
                            <div className="card-3d-wrap mx-auto my-4 py-0" style={{height:"475px"}}>
                                <Loader loaded={loaderState}  className="spinner" color="#FFF" radius={10} width={3} trail={60} speed={1} position="relative" top="100px">
                                    <div className="card-3d-wrapper " >
                                        <div className="card-front ">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Log In</h4>
                                                    <div className="form-group">
                                                        <input type="email" onChange={handleLoginChange} name="lemail" className="form-style" placeholder="Your Email" id="lemail" value={loginData.lemail} />
                                                        <i className="input-icons uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-4">
                                                        <input type="password" onChange={handleLoginChange} name="lpassword" className="form-style" placeholder="Your Password" id="lpassword"  value={loginData.lpassword} />
                                                        <i className="input-icons uil uil-lock-alt"></i>
                                                    </div>
                                                    <button  className="btn-2 btn-2-outline-warning mt-4"  onClick={clickedLogin} >Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3" >Sign Up</h4>
                                                    <div className="form-group">
                                                        <input type="text" onChange={handleSignUpChange} name="fName" className="form-style" placeholder="Your First Name" id="fName" value={signUpData.fName} />
                                                        <i className="input-icons uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="text" onChange={handleSignUpChange} name="lName" className="form-style" placeholder="Your Last Name" id="lName" value={signUpData.lName}  />
                                                        <i className="input-icons uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="text" onChange={handleSignUpChange} name="userName" className="form-style" placeholder="Your User Name" id="userName" value={signUpData.userName}  />
                                                        <i className="input-icons uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="email"  onChange={handleSignUpChange} name="email" className="form-style" placeholder="Your Email" id="email" value={signUpData.email}  />
                                                        <i className="input-icons uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="password" onChange={handleSignUpChange} name="password" className="form-style" placeholder="Your Password" id="password" value={signUpData.password}  />
                                                        <i className="input-icons uil uil-lock-alt"></i>
                                                    </div>
                                                    <button className="btn-2 btn-2-outline-warning mt-4" onClick={clickedSignUp} >Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Loader>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
