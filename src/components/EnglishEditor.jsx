import {React} from "react";
import { useSelector,useDispatch } from "react-redux";
import { getWords } from "../actions";
import Word from "./Word";
import LiveWPM from "./LiveWPM"
import LiveAccuracy from "./LiveAccuracy";


export default function EnglishEditor(){

    const dispatch=useDispatch()
    
    const words=useSelector((state)=>{
        return state.handleWordState
    })
    if(words.length===0){
        dispatch(getWords())
    }
    

    return (
        <>
            <LiveWPM/>
            <LiveAccuracy/>
            <div className="textArea" id="area" >
                {words.map((word,idx)=>{
                    return (
                        <Word word={word} key={idx} idx={idx} />
                    )
                })}
            </div>
        </>
    )
}