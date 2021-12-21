import React from 'react'
import { useSelector } from 'react-redux'
export default function Character(props) {


    const activeWordState=useSelector((state)=>{
        return state.handleActiveWordState
    })
    
    return (
        <span className={`everyChar ${((props.idx===activeWordState.char && props.wordIdx===activeWordState.word) ? "activeChar" :"")}`}>
            {props.char}
        </span>
    )
}
