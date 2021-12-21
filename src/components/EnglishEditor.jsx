import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { getWords } from "../actions";
import {words} from "../helpers/words.json"
import Word from "./Word";

export default function EnglishEditor(){


    // const { typedWord, currWord, timer, words, typedHistory } = this.props;
    // let extraLetters = typedWord.slice(currWord.length).split("");
    const dispatch=useDispatch()

    // console.log(words)

    // const line="this is a seed data for the english word"
    const line=["this","is","a","seed","data","for","the","english","word"]

    return (
        <p className="textArea">
            {line.map((word,idx)=>{
                return <Word word={word} key={idx} idx={idx}/>
        })}
        </p>
    )
    // return (
    //     <div className="test">
    //         <div className="timer">{timer}</div>
    //         <div className="box">
    //             {words.map((word, idx) => {
    //                 return (
    //                     <div
    //                         key={word + idx}
    //                         className="word"
    //                         id={currWord === word ? "active" : undefined}>
    //                         {currWord === word ? (
    //                             <span
    //                                 id="caret"
    //                                 className="blink"
    //                                 style={{
    //                                     left: typedWord.length * 14.5833,
    //                                 }}>
    //                                 |
    //                             </span>
    //                         ) : null}
    //                         {word.split("").map((char, charId) => {
    //                             return (
    //                                 <span key={char + charId}>{char}</span>
    //                             );
    //                         })}
    //                         {currWord === word
    //                             ? extraLetters.map((char, charId) => {
    //                                 return (
    //                                     <span
    //                                         key={char + charId}
    //                                         className="wrong extra">
    //                                         {char}
    //                                     </span>
    //                                 );
    //                             })
    //                             : typedHistory[idx]
    //                                 ? typedHistory[idx]
    //                                     .slice(words[idx].length)
    //                                     .split("")
    //                                     .map((char, charId) => {
    //                                         return (
    //                                             <span
    //                                                 key={char + charId}
    //                                                 className="wrong extra">
    //                                                 {char}
    //                                             </span>
    //                                         );
    //                                     })
    //                                 : null}
    //                     </div>
    //                 );
    //             })}
    //         </div>
    //     </div>
    // );
}