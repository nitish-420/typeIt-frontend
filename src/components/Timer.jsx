import {React,useState} from 'react'
import {useSelector } from "react-redux"

export default function Timer() {

    let testState=useSelector((state)=>{
        return state.handleTestCompleteState
    })

    let runningTimeState=useSelector((state)=>{
        return state.handleRunningTimeState
    }) 

    let timeState=useSelector((state)=>{
        return state.handleTimeState
    })

    const [timer,setTimer]=useState(timeState)

    setInterval(()=>{
        if(runningTimeState!==null && !testState){
            setTimer(()=>{
                return Math.ceil(timeState-(Date.now()-runningTimeState)/1000)
            })
        }
        else{
            setTimer(()=>{
                return timeState
            })
        }
    },100)

    return (
        <div>
            {timer}
        </div>
    )
}
