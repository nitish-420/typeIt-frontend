import {React} from "react";
import { useSelector,useDispatch } from "react-redux";
import { getWords } from "../actions";
import Word from "./Word";


export default function EnglishEditor(props){

    const dispatch=useDispatch()
    
    const words=useSelector((state)=>{
        return state.handleWordState
    })
    if(words.length===0){
        dispatch(getWords())
    }

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