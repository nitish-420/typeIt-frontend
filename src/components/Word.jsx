import {React,useEffect} from 'react'
import Character from "./Character";
import { useSelector } from 'react-redux';
import Caret from "./Caret";

export  default function Word(props){

    const activeWordState=useSelector((state)=>{
        return state.handleActiveWordState
    })


    useEffect(()=>{
        document.getElementsByClassName("word")[0].scrollIntoView();
    },[])


    
    return (

        <div className='word' id={`${props.idx===activeWordState.word ? "activeWord":"" }`} >
            {activeWordState.word===props.idx ? <Caret len={props.word.length}/>:null}
            {props.word.split("").map((char,idx)=>{
                return <Character char={char} key={idx} idx={idx} wordIdx={props.idx}/>
            })}
        </div>
    )
};
