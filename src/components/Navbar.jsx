import React from "react";
import {Link,useLocation,useHistory} from "react-router-dom"
import { useDispatch ,useSelector} from "react-redux";
import { UilClock } from '@iconscout/react-unicons'

import { showAlert,setTime,setLanguage,resetCurrentUser, setGuest } from "../actions";
import editUser from "../Image/editUser.png"

function Navbar(props) {

    let dispatch=useDispatch()

    const location=useLocation();
    let history=useHistory()

    let timeState=useSelector((state)=>{
        return state.handleTimeState
    })

    let languageState=useSelector((state)=>{
        return state.handleLanguageState
    })

    const testState=useSelector((state)=>{
		return state.handleTestState
	})

    let guestState=useSelector((state)=>{
        return state.handleGuestState
    })


    const handleLogout=()=>{
        localStorage.removeItem("token")
        dispatch(showAlert("Good Bye, Looking forward to seeing you at TypeIt","warning"))
        dispatch(resetCurrentUser())
        dispatch(setGuest())
        history.push("/login")
    }
    


    return (
        <div className="container pt-4" id="navbar">
            <nav className="row navbar navbar-expand-lg navbar-dark">
                <div  className={` col-11 col-md-10 col-lg-8 ${testState ? "d-none" : "d-flex"} flex-row p-0 m-0 align-items-center justify-content-between  mx-0 bg-dark fs-5`}>
                    <div><Link className={`m-0 p-0 nav-link `} data-toggle="tooltip" style={{fontSize:"2rem",color:"#ffeba7"}} title="TypeIt" to="/" >TypeIt</Link></div>
                    <div><Link className={`m-0 p-0 nav-link ${location.pathname==="/" ? "text-light navbar-brand " : "text-muted"}`} aria-current="page" to="/"  >Home</Link></div>
                    <div><Link className={`m-0 p-0 nav-link ${location.pathname==="/about" ? "text-light navbar-brand " : "text-muted"}`} to="/about" >About</Link></div>
                    <div><Link className={`m-0 p-0 nav-link ${location.pathname==="/user" ? "text-light navbar-brand " : "text-muted"}`} to="/user" >User</Link></div>
                    <div><Link className={`m-0 p-0 nav-link ${location.pathname==="/leaderboard" ? "text-light navbar-brand " : "text-muted"}`} to="/leaderboard" >LeaderBoard</Link></div>
                    <div>
                        {!localStorage.getItem("token") ?
                        
                        <Link className={`m-0 p-0  nav-link ${location.pathname==="/login" ? "text-light navbar-brand " : "text-muted"}`} to="/login" >Login</Link>
                        :
                        <Link onClick={()=>handleLogout()} className={`m-0 p-0 text-muted nav-link `} to="/login"  >LogOut</Link>
                        
                        }
                    </div>
                </div>
                <div className={` ${(location.pathname==='/user' || location.pathname==="/updateuser") ? "d-none" : "col-1"}`}>
                    <div className={` ${(!testState && location.pathname==='/') ? "d-lg-none" : "d-none"} `}>
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon "></span>
                        </button>
                        <div className="offcanvas offcanvas-end text-white bg-dark" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                            <div className="offcanvas-header">
                                <h5 className="text-center ms-5 mt-2" id="offcanvasRightLabel">While( ! ( succeed = try() ) ); </h5>
                                <button type="button" className="btn-close btn-close-white text-reset " data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <div className=" h-100 d-flex flex-column justify-content-start fs-4 align-items-center">
                                    <div className="fs-3">Select Time</div>
                                    <div className={`mx-1 p-0  nav-link ${timeState===15 ? "text-light " : "text-muted"}`} onClick={()=>dispatch(setTime(15))} >15</div>
                                    <div className={`mx-1 p-0  nav-link ${timeState===30 ? "text-light " : "text-muted"}`} onClick={()=>dispatch(setTime(30))} >30</div>
                                    <div className={`mx-1 p-0  nav-link ${timeState===60 ? "text-light  " : "text-muted"}`} onClick={()=>dispatch(setTime(60))} >60</div>
                                    <div className={`mx-1 p-0  nav-link ${timeState===120 ? "text-light  " : "text-muted"}`} onClick={()=>dispatch(setTime(120))} >120</div>
                                    <hr className="w-100" style={{color:"white"}}/>
                                    <div className="fs-3">Select Language</div>
                                    <div className={`mx-1 p-0  nav-link ${languageState==="English" ? "text-light " : "text-muted"}`} onClick={()=>dispatch(setLanguage("English"))} >English</div>
                                    <div className={`mx-1 p-0  nav-link ${languageState==="Python" ? "text-light " : "text-muted"}`} onClick={()=>dispatch(setLanguage("Python"))} >Python</div>
                                    <div className={`mx-1 p-0  nav-link ${languageState==="C" ? "text-light " : "text-muted"}`} onClick={()=>dispatch(setLanguage("C"))} >C/C++</div>
                                    <div className={`mx-1 p-0  nav-link ${languageState==="Javascript" ? "text-light " : "text-muted"}`} onClick={()=>dispatch(setLanguage("Javascript"))} >JavaScript</div>
                                    <div className={`mx-1 p-0  nav-link ${languageState==="Java" ? "text-light " : "text-muted"}`} onClick={()=>dispatch(setLanguage("Java"))} >Java</div>
                                    <div className="mt-auto p-2" style={{fontSize:"0.9rem"}}>For best experience use big screen</div>
                                    <div className="" style={{fontSize:"0.9rem"}}>Speciall for Non English Languages</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={` col-1 col-md-2 col-lg-4 m-0 p-0 ${(!guestState && (location.pathname==='/user' || location.pathname==="/updateuser")) ? "d-flex justify-content-end" : "d-none"}`} >
                    <Link to="/updateuser" >
                    <img  src={editUser} alt="Edit" width="30" height="30"/>
                    </Link>
                </div>
                <div className={`col-3 ${(!testState && location.pathname==='/') ? "d-none d-lg-flex" : "d-none"} flex-column justify-content-between`} style={{fontSize:"0.8rem"}}>
                    <div className="d-flex flex-row justify-content-end align-items-center ">
                    <UilClock size="22" color="#FFD651" />
                        <div className={`mx-1 p-0  nav-link ${timeState===15 ? "text-light fs-6" : "text-muted"}`} onClick={()=>dispatch(setTime(15))} >15</div>
                        <div className={`mx-1 p-0   nav-link ${timeState===30 ? "text-light fs-6" : "text-muted"}`} onClick={()=>dispatch(setTime(30))} >30</div>
                        <div className={`mx-1 p-0  nav-link ${timeState===60 ? "text-light fs-6 " : "text-muted"}`} onClick={()=>dispatch(setTime(60))} >60</div>
                        <div className={`mx-1 p-0  nav-link ${timeState===120 ? "text-light fs-6 " : "text-muted"}`} onClick={()=>dispatch(setTime(120))} >120</div>
                    </div>
                    <div className="d-flex flex-row justify-content-end align-items-center">
                    
                        
                        <div className={`mx-1 p-0  nav-link ${languageState==="English" ? "text-light fs-6" : "text-muted"}`} onClick={()=>dispatch(setLanguage("English"))} >English</div>
                        <div className={`mx-1 p-0  nav-link ${languageState==="Python" ? "text-light fs-6" : "text-muted"}`} onClick={()=>dispatch(setLanguage("Python"))} >Python</div>
                        <div className={`mx-1 p-0  nav-link ${languageState==="C" ? "text-light fs-6" : "text-muted"}`} onClick={()=>dispatch(setLanguage("C"))} >C/C++</div>
                        <div className={`mx-1 p-0  nav-link ${languageState==="Javascript" ? "text-light fs-6" : "text-muted"}`} onClick={()=>dispatch(setLanguage("Javascript"))} >JavaScript</div>
                        <div className={`mx-1 p-0  nav-link ${languageState==="Java" ? "text-light fs-6" : "text-muted"}`} onClick={()=>dispatch(setLanguage("Java"))} >Java</div>
                    </div>
                </div>

            </nav>
        </div>
    )

}

export default Navbar