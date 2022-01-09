import {React,useEffect} from 'react'
import { useSelector } from 'react-redux'
import Line from './Line'
import { useScrollDirection } from 'react-use-scroll-direction'


export default function OtherLanguageEditor(props) {

    const {scrollDirection,scrollTargetRef} =useScrollDirection()

    const {handleScroll}=props

    const lines=useSelector((state)=>{
        return state.handleWordState
    })
    if(lines.length===0){
        props.getProperWords()
    }

    useEffect(()=>{

        if(scrollDirection==="DOWN"){
            handleScroll()
        }
    },[scrollDirection,handleScroll])


    return (
        <div className="textAreaCode mt-4" id="area" ref={scrollTargetRef} style={{position:"relative"}}>
            {lines.map((line, idx) => {
                return (
                    <Line key={idx} lineIdx={idx} line={line} caretLength={props.caretLength}/>
                )
            })}
        </div>
    )
}
