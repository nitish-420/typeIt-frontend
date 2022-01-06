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
        <nav className="nav-bar">
            <div className="logo-name">
                <Link className={`m-0 p-0 nav-link text-light navbar-brand`} data-toggle="tooltip" style={{fontSize:"1.5rem"}} title="TypeIt" to="/">TypeIt</Link>
            </div>
            <div className={`${testState ? "d-none" : "d-flex"} p-0 m-0 mb-1 align-items-center col-12 col-sm-6 col-md-5 `}>
                <Link className={`nav-items nav-link ${location.pathname==="/" ? "text-light navbar-brand" : "text-muted"}`} aria-current="page" to="/"  >Home</Link>
                <Link className={`nav-items nav-link ${location.pathname==="/about" ? "text-light navbar-brand" : "text-muted"}`} to="/about" >About</Link>
                <Link className={`nav-items nav-link ${location.pathname==="/user" ? "text-light navbar-brand" : "text-muted"}`} to="/user" >User</Link>
                <Link className={`nav-items nav-link ${location.pathname==="/leaderboard" ? "text-light navbar-brand" : "text-muted"}`} to="/leaderboard" >LeaderBoard</Link>

                {!localStorage.getItem("token") ?
                
                <Link className={`m-0 p-0 nav-items nav-link ${location.pathname==="/login" ? "text-light navbar-brand" : "text-muted"}`} to="/login" >Login</Link>
                :
                <Link onClick={()=>handleLogout()} className={`m-0 p-0 text-muted nav-link `} to="/login"  >LogOut</Link>
                
                }
                <div className="home-items">
                {location.pathname==='/' &&
                < >
                <div className="time-item">
                    <p className={`mx-1 p-0  nav-link ${timeState===15 ? "text-light navbar-brand-2" : "text-muted"}`} onClick={()=>dispatch(setTime(15))} >15</p>
                    <p className={`mx-1 p-0  nav-link ${timeState===30 ? "text-light navbar-brand-2" : "text-muted"}`} onClick={()=>dispatch(setTime(30))} >30</p>
                    <p className={`mx-1 p-0  nav-link ${timeState===60 ? "text-light navbar-brand-2" : "text-muted"}`} onClick={()=>dispatch(setTime(60))} >60</p>
                    <p className={`mx-1 p-0  nav-link ${timeState===120 ? "text-light navbar-brand-2" : "text-muted"}`} onClick={()=>dispatch(setTime(120))} >120</p>
                    </div>
    
                <div className="lang-item">
                    <p className={`mx-1 p-0  nav-link ${languageState==="English" ? "text-light navbar-brand-2" : "text-muted"}`} onClick={()=>dispatch(setLanguage("English"))} >English</p>
                    <p className={`mx-1 p-0  nav-link ${languageState==="Python" ? "text-light navbar-brand-2" : "text-muted"}`} onClick={()=>dispatch(setLanguage("Python"))} >Python</p>
                    <p className={`mx-1 p-0  nav-link ${languageState==="C" ? "text-light navbar-brand-2" : "text-muted"}`} onClick={()=>dispatch(setLanguage("C"))} >C</p>
                    <p className={`mx-1 p-0  nav-link ${languageState==="Javascript" ? "text-light navbar-brand-2" : "text-muted"}`} onClick={()=>dispatch(setLanguage("Javascript"))} >Javascript</p>
                    <p className={`mx-1 p-0  nav-link ${languageState==="Java" ? "text-light navbar-brand-2" : "text-muted"}`} onClick={()=>dispatch(setLanguage("Java"))} >Java</p>
                    </div>
                </> } 
                </div>
                </div>

                <div className="empty-items">
                    .
                </div>
        </nav>
    )

}

export default Navbar