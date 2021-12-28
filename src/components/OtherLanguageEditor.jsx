import React from 'react'
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

    return (
        <>
            <div className="textAreaCode" id="area" onScroll={ (scrollDirection!==null && scrollDirection!=="RIGHT") ? props.handleScroll : null} ref={scrollTargetRef} >
				{lines.map((line, idx) => {
					return (
                        <Line key={idx} lineIdx={idx} line={line} />
					)
				})}
			</div>
        </>
    )
}
