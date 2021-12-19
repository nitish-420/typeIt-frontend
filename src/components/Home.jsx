import React from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Home() {

    const guestState=useSelector((state)=>{
        return state.handleGuestState
    })
    

    let history=useHistory();
    
    if(!localStorage.getItem("token") && !guestState){
        history.push("/login")
    }

    return (
        <div>
            hii this is home
        </div>
    )
}
