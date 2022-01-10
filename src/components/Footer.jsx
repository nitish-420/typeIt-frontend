import React from 'react'
import { useSelector } from 'react-redux';
var testState;
export default function Footer() {

    testState=useSelector((state)=>{
		return state.handleTestState
	})

    return (
        <div className={`${testState ? "d-none":" m-0 p-0 text-center"}`} >
            <a rel="noreferrer" target="_blank" className='d-inline-block text-center fs-4 p-0' href="https://github.com/nitish-420/typeIt-frontend" style={{textDecoration:"none",cursor:"pointer",color:"#ffeba7"}}>{"</>"}Github</a>
        </div>
    )
}
