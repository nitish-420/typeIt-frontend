import {React} from 'react'
import ScrollIntoView from "react-scroll-into-view-if-needed"



export default function Caret(props) {


    return (
        <ScrollIntoView   options={{block:"start",inline:"center",scrollMode:"always",behavior:"smooth",}} style={{display:"inline"}} >
            <span className='d-inline-block ' id='caret' style={{fontFamily:"monospace",fontSize:"40px",marginLeft:`${-11+20*props.caretLength}px`,width:"20px"}}>
                |
            </span>
        </ScrollIntoView>

    )
}
