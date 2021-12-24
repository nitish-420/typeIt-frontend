import React from 'react'
import { useSelector } from 'react-redux'
export default function LiveAccuracy() {

    let liveAccuracy=useSelector((state)=>{
        return state.handleLiveAccuracyState
    })


    return (
        <div>
            {liveAccuracy}%
        </div>
    )
}
