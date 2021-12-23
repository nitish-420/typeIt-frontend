import React from 'react'
import { offRestart,stopTest,resetActiveState,getWords,resetCorrectCharacter,resetCompleteTestState,resetRunningTimeState ,resetWrongCharacter, resetLiveAccuracy, resetLiveWpm} from '../actions'
import { useDispatch} from 'react-redux'

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

    const restartClicked=()=>{
        dispatch(offRestart())
        dispatch(stopTest())
        dispatch(resetRunningTimeState())
        dispatch(resetActiveState())
        dispatch(resetCorrectCharacter())
        dispatch(resetWrongCharacter())
        dispatch(resetLiveAccuracy())
        dispatch(resetLiveWpm())
        dispatch(resetCompleteTestState())
        dispatch(getWords())
    
    }

    return (
        <div>
            <button onClick={()=>restartClicked() }>Restart</button>
        </div>
    )
}
