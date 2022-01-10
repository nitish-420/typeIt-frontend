import {React} from "react";
import { useSelector } from "react-redux";
import Word from "./Word";

export default function EnglishEditor(props){
        
    const words=useSelector((state)=>{
        return state.handleWordState
    })

    if(words.length===0){
        props.getProperWords()
    }

    return (
        <div className="textArea mt-4" id="area"   onScroll={props.handleScroll} style={{position:"relative"}}>
            {words.map((word,idx)=>{
                return (
                    <Word word={word} activeWordIndex={props.activeWordIndex} key={idx} idx={idx} lineIdx={0} caretLength={props.caretLength}/>
                )
            })}
        </div>
    )
}