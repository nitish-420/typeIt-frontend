import {React} from 'react'
import Word from './Word';

export  default function Line(props){

    
    return (

        // <div className='eachLineOfCode m-0 pb-2' >
        <div className='eachLineOfCode m-0 p-0' >
            {props.line.split(" ").map((word,idx)=>{
                return (
                    <Word word={word} key={idx} idx={idx} lineIdx={props.lineIdx}/>
                )
            })}
        </div>
    )
};
