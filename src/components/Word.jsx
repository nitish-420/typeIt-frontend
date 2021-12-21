import React from 'react'
import Character from "./Character";
import { useSelector } from 'react-redux';

export default function Word(props) {

    const activeWordState=useSelector((state)=>{
        return state.handleActiveWordState
    })
    
    return (
        <div className={`word  ${props.idx===activeWordState.word ? "activeWord":"" }`}>
            {props.word.split("").map((char,idx)=>{
                return <Character char={char} key={idx} idx={idx} wordIdx={props.idx}/>
            })}
        </div>
    )
}
