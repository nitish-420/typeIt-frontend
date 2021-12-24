import {React} from 'react'
import {useSelector } from "react-redux"

export default function Timer() {

    let liveTimer=useSelector((state)=>{
        return state.handleLiveTimerState
    })

    let timeState=useSelector((state)=>{
        return state.handleTimeState
    })
    

    return (
        <div>
            {liveTimer!==null ? liveTimer : timeState }
        </div>
    )
}
