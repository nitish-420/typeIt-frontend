import {React} from 'react'
import Word from './Word';

export  default function Line(props){

    
    return (

        <div className='eachLineOfCode'  >
            {props.line.split(" ").map((word,idx)=>{
                return (
                    <Word word={word} key={idx} idx={idx} lineIdx={props.lineIdx}/>
                )
            })}
        </div>
    )
};
