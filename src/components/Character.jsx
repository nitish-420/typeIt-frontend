import React from 'react'
// import { useSelector } from 'react-redux'
export default function Character(props) {


    // const activeWordState=useSelector((state)=>{
    //     return state.handleActiveWordState
    // })

    // const words=useSelector((state)=>{
    //     return state.handleWordState
    // })
    
    return (
        <span className='everyChar'>
            {props.char}
        </span>
    )
}
