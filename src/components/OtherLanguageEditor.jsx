import {React,useEffect} from 'react'
import { useSelector } from 'react-redux'
import Line from './Line'
import { useScrollDirection } from 'react-use-scroll-direction'


export default function OtherLanguageEditor(props) {

    const {scrollDirection,scrollTargetRef} =useScrollDirection()

    const lines=useSelector((state)=>{
        return state.handleWordState
    })
    if(lines.length===0){
        props.getProperWords()
    }

    useEffect(()=>{
        if(scrollDirection==="DOWN"){
            props.handleScroll()
        }
    },[scrollDirection,props])


    return (
        <>
            <div className="textAreaCode" id="area" ref={scrollTargetRef} >
				{lines.map((line, idx) => {
					return (
                        <Line key={idx} lineIdx={idx} line={line} />
					)
				})}
			</div>
        </>
    )
}
