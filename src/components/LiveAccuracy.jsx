import React from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { setLiveAccuracy } from '../actions'
export default function LiveAccuracy() {


    const dispatch=useDispatch()

    let testState=useSelector((state)=>{
        return state.handleTestCompleteState
    })

    let rightCharacterState=useSelector((state)=>{
        return state.handleRightCharacterState
    })

    let wrongCharacterState=useSelector((state)=>{
        return state.handleWrongCharacterState
    })

    let liveAccuracy=useSelector((state)=>{
        return state.handleLiveAccuracyState
    })

    setInterval(()=>{
        if(rightCharacterState.size!==0 && testState===false){
            console.log("yess",rightCharacterState)
            dispatch(setLiveAccuracy(Math.ceil((rightCharacterState.size*100)/(rightCharacterState.size+wrongCharacterState.size))))
        }
    },1000)

    return (
        <div>
            {liveAccuracy}%
        </div>
    )
}
