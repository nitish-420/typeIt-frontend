import React from "react";
import {Link,useLocation,useHistory} from "react-router-dom"
import { useDispatch ,useSelector} from "react-redux";


import { showAlert,setTime,setLanguage } from "../actions";


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


    const handleLogout=()=>{
        localStorage.removeItem("token")
        dispatch(showAlert("Good Bye","danger"))
        history.push("/login")
    }
    


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark my-0 py-0">
            <div className="d-flex p-0 m-0 mb-1 align-items-center col-12 col-sm-6 col-md-5 justify-content-evenly">
                <Link className={`m-0 p-0  nav-link text-light navbar-brand`} data-toggle="tooltip" style={{fontSize:"1.1rem"}} title="TypeIt" to="/">TypeIt</Link>
                <Link className={`m-0 p-0  nav-link ${location.pathname==="/" ? "text-light navbar-brand" : "text-muted"}`} aria-current="page" to="/"  >Home</Link>
                <Link className={`m-0 p-0  nav-link ${location.pathname==="/about" ? "text-light navbar-brand" : "text-muted"}`} to="/about" >About</Link>
                {!localStorage.getItem("token") ?
                
                <Link className={`m-0 p-0 nav-link ${location.pathname==="/login" ? "text-light navbar-brand" : "text-muted"}`} to="/login" >Login</Link>
                :
                <Link onClick={handleLogout} className={`m-0 p-0 text-muted nav-link `} to="/login"  >LogOut</Link>
                
                }
                {location.pathname==='/' &&
                < >
                
                    <Link className={`mx-1 p-0  nav-link ${timeState===15 ? "text-light navbar-brand" : "text-muted"}`} onClick={()=>dispatch(setTime(15))} >15</Link>
                    <Link className={`mx-1 p-0  nav-link ${timeState===30 ? "text-light navbar-brand" : "text-muted"}`} onClick={()=>dispatch(setTime(30))} >30</Link>
                    <Link className={`mx-1 p-0  nav-link ${timeState===45 ? "text-light navbar-brand" : "text-muted"}`} onClick={()=>dispatch(setTime(45))} >45</Link>
                    <Link className={`mx-1 p-0  nav-link ${timeState===60 ? "text-light navbar-brand" : "text-muted"}`} onClick={()=>dispatch(setTime(60))} >60</Link>
    
    
    
                    <Link className={`mx-1 p-0  nav-link ${languageState==="English" ? "text-light navbar-brand" : "text-muted"}`} onClick={()=>dispatch(setLanguage("English"))} >English</Link>
                    <Link className={`mx-1 p-0  nav-link ${languageState==="Python" ? "text-light navbar-brand" : "text-muted"}`} onClick={()=>dispatch(setLanguage("Python"))} >Python</Link>
                    <Link className={`mx-1 p-0  nav-link ${languageState==="C" ? "text-light navbar-brand" : "text-muted"}`} onClick={()=>dispatch(setLanguage("C"))} >C</Link>
                    <Link className={`mx-1 p-0  nav-link ${languageState==="Java" ? "text-light navbar-brand" : "text-muted"}`} onClick={()=>dispatch(setLanguage("Java"))} >Java</Link>
                    <Link className={`mx-1 p-0  nav-link ${languageState==="Javascript" ? "text-light navbar-brand" : "text-muted"}`} onClick={()=>dispatch(setLanguage("Javascript"))} >Javascript</Link>
                    
                </> }  
                
            </div>
        </nav>
    )

}

export default Navbar