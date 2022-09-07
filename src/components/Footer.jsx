import React from 'react'
import { useSelector } from 'react-redux';
import UilGithub from '@iconscout/react-unicons/icons/uil-github'
import { UilEnvelope } from '@iconscout/react-unicons'

var testState;
export default function Footer() {

    testState=useSelector((state)=>{
		return state.handleTestState
	})

    return (
        <div className={`${testState ? "d-none":" m-0 p-0 d-flex flex-row justify-content-center"}`} >
            {/* <a rel="noreferrer"  target="_blank" className='d-inline-block text-center fs-6 p-0 mx-4' href="https://github.com/nitish-420/typeIt-frontend" style={{ textDecoration:"none",cursor:"pointer",color:"#ffeba7"}}><UilGithub size="40" color="#FFD651" /> Github</a> */}
            <a rel="noreferrer"  target="_blank" className='d-inline-block text-center fs-6 p-0 mx-4' href = "mailto: teamTypeIt@outlook.com" style={{textDecoration:"none",cursor:"pointer",color:"#ffeba7"}}><UilEnvelope size="43" color="#FFD651" /> TypeIt</a>
        </div>
    )
}
