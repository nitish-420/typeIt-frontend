import React from 'react'
import { useSelector } from 'react-redux'
export default function Character(props) {


    const activeWordState=useSelector((state)=>{
        return state.handleActiveWordState
    })

    // const words=useSelector((state)=>{
    //     return state.handleWordState
    // })
    
    const rightCharacter=useSelector((state)=>{
        return state.handleRightCharacterState
    })

    return (
        <span className={`everyChar  ${(props.wordIdx<activeWordState.word || (props.wordIdx===activeWordState.word && props.idx<activeWordState.char)) && ((rightCharacter.has(props.wordIdx*100+props.idx)) ? "rightCharacter" : "wrongCharacter")}`}>
            {props.char}
        </span>
    )
}
