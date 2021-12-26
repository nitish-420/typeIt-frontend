import {React} from 'react'
import { useSelector } from 'react-redux'
import ScrollIntoView from "react-scroll-into-view-if-needed"

export default function Caret(props) {

    const activeWordState=useSelector((state)=>{
        return state.handleActiveWordState
    })




    return (
        <ScrollIntoView  options={{block:"start",scrollMode:"always",behavior:"smooth"}} style={{display:"inline"}} alignToTop={true} >
            <span id='caret'  style={{right:(-10-20*Math.min(props.len,activeWordState.char))}} >
                |
            </span>
        </ScrollIntoView>

    )
}
