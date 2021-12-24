import {React} from 'react'
import { useSelector } from 'react-redux'
export default function Caret(props) {

    const activeWordState=useSelector((state)=>{
        return state.handleActiveWordState
    })
 

    return (
        <span id='caret' className='blink' style={{right:(-10-20*Math.min(props.len,activeWordState.char))}}>
            |
        </span>
    )
}
