import {React} from 'react'
import Character from "./Character";
import Caret from "./Caret";
import { useSelector } from 'react-redux';

export  default function Word(props){

    let currWord=useSelector((state)=>{
        return state.handleCurrWordState
    })

    return (

        <div className='word' id={`${currWord===props.word ? "activeWord":"" }`}>
            {currWord===props.word ? <Caret len={props.word.length}/>:null}
            {props.word.split("").map((char,idx)=>{
                return <Character char={char} key={idx} idx={idx} wordIdx={props.idx}/>
            })}
        </div>
    )
};
