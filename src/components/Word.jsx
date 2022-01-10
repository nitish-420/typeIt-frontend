import {React} from 'react'
import Character from "./Character";
import Caret from "./Caret";

export  default function Word(props){

    return (

        <div className='word ' id={`${(props.idx===props.activeWordIndex && props.lineIdx===0) ? "activeWord":"" }`} >
            {(props.idx===props.activeWordIndex && props.lineIdx===0) ? <Caret caretLength={props.caretLength}/>:null}
            {props.word.split("").map((char,idx)=>{
                return <Character char={char} key={idx} />
            })}
            {props.word===""?<Character char={""} key={0} />:null}
        </div>
    )
};
