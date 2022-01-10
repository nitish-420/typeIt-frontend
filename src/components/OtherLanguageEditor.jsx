import {React} from 'react'
import { useSelector } from 'react-redux'
import Line from './Line'

export default function OtherLanguageEditor(props) {

    const lines=useSelector((state)=>{
        return state.handleWordState
    })
    if(lines.length===0){
        props.getProperWords()
    }

    return (
        <div className="textAreaCode scrollbar-hidden mt-4" id="area" style={{position:"relative"}}>
            {lines.map((line, idx) => {
                return (
                    <Line key={idx} activeWordIndex={props.activeWordIndex} lineIdx={idx} line={line} caretLength={props.caretLength}/>
                )
            })}
        </div>
    )
}
