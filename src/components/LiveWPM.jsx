import {React,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { setLiveWpm } from '../actions'

export default function LiveWPM() {

    const dispatch=useDispatch()

    let testState=useSelector((state)=>{
        return state.handleTestCompleteState
    })


    let rightCharacterState=useSelector((state)=>{
        return state.handleRightCharacterState
    })

    
    let liveWpm=useSelector((state)=>{
        return state.handleLiveWpmState
    })
    
    const runningTimeState=useSelector((state)=>{
        return state.handleRunningTimeState
    })

    setInterval(()=>{
        if(runningTimeState!==null && !testState){
            console.log(runningTimeState,"this is done ")
            
            dispatch(setLiveWpm(Math.ceil((rightCharacterState.size*12000)/(Date.now()-runningTimeState))))
        }
    },1000)

    return (
        <div>
            {liveWpm}
        </div>
    )
}
