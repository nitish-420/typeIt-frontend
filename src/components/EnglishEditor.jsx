import {React} from "react";
import { useSelector } from "react-redux";
import Word from "./Word";


export default function EnglishEditor(props){

    const words=useSelector((state)=>{
        return state.handleWordState
    })


    return (
        <>
            <div className="textArea" id="area"  ref={props.areaRef} >
                {words.map((word,idx)=>{
                    return (
                        <Word word={word} key={idx} idx={idx} />
                    )
                })}
            </div>
        </>
    )
}