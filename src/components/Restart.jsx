import React from 'react'
import { offRestart,stopTest } from '../actions'
import { useDispatch } from 'react-redux'

export default function Restart() {
    
    const dispatch=useDispatch()

    window.onkeydown=(e)=>{
        switch(e.key){
            case "Escape":
                e.preventDefault()
                dispatch(offRestart())
                break
            case "Enter":
                e.preventDefault()
                dispatch(offRestart())
                break
            default :
                e.preventDefault()

        }
    }

    return (
        <div>
            <button onClick={()=>dispatch(stopTest()) }>Restart</button>
        </div>
    )
}
