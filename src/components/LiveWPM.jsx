import {React} from 'react'
import { useSelector } from 'react-redux'

export default function LiveWPM() {


    let liveWpm=useSelector((state)=>{
        return state.handleLiveWpmState
    })


    return (
        <div>
            {liveWpm}
        </div>
    )
}
