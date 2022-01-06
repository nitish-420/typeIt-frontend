import React from "react";
import {Link,useLocation,useHistory} from "react-router-dom"
import { useDispatch ,useSelector} from "react-redux";


import { showAlert,setTime,setLanguage,resetCurrentUser } from "../actions";


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


    const handleLogout=()=>{
        localStorage.removeItem("token")
        dispatch(showAlert("Good Bye","danger"))
        dispatch(resetCurrentUser())
        history.push("/login")
    }
    


    return (
        <div className="container pt-4" id="navbar">
            <div className="row">
                <nav  className={` col-8 ${testState ? "d-none" : "d-flex"} flex-row p-0 m-0 align-items-center justify-content-between  navbar mx-0 navbar-dark bg-dark fs-5`}>
                    <div><Link className={`m-0 p-0 nav-link text-light `} data-toggle="tooltip" style={{fontSize:"2rem"}} title="TypeIt" to="/">TypeIt</Link></div>
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
                </nav>
                <div className="col-1">
                        
                </div>
                <div className={`col-3 ${(!testState && location.pathname==='/') ? "d-flex" : "d-none"} flex-column justify-content-between`} style={{fontSize:"0.8rem"}}>
                    <div className="d-flex flex-row justify-content-end align-items-center ">
                        <div className={`mx-1 p-0  nav-link ${timeState===15 ? "text-light fs-6" : "text-muted"}`} onClick={()=>dispatch(setTime(15))} >15</div>
                        <div className={`mx-1 p-0   nav-link ${timeState===30 ? "text-light fs-6" : "text-muted"}`} onClick={()=>dispatch(setTime(30))} >30</div>
                        <div className={`mx-1 p-0  nav-link ${timeState===60 ? "text-light fs-6 " : "text-muted"}`} onClick={()=>dispatch(setTime(60))} >60</div>
                        <div className={`mx-1 p-0  nav-link ${timeState===120 ? "text-light fs-6 " : "text-muted"}`} onClick={()=>dispatch(setTime(120))} >120</div>
                    </div>
                    <div className="d-flex flex-row justify-content-end align-items-center">
                        <div className={`mx-1 p-0  nav-link ${languageState==="English" ? "text-light fs-6" : "text-muted"}`} onClick={()=>dispatch(setLanguage("English"))} >English</div>
                        <div className={`mx-1 p-0  nav-link ${languageState==="Python" ? "text-light fs-6" : "text-muted"}`} onClick={()=>dispatch(setLanguage("Python"))} >Python</div>
                        <div className={`mx-1 p-0  nav-link ${languageState==="C" ? "text-light fs-6" : "text-muted"}`} onClick={()=>dispatch(setLanguage("C"))} >C</div>
                        <div className={`mx-1 p-0  nav-link ${languageState==="Javascript" ? "text-light fs-6" : "text-muted"}`} onClick={()=>dispatch(setLanguage("Javascript"))} >JavaScript</div>
                        <div className={`mx-1 p-0  nav-link ${languageState==="Java" ? "text-light fs-6" : "text-muted"}`} onClick={()=>dispatch(setLanguage("Java"))} >Java</div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Navbar