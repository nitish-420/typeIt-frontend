import {React} from 'react'
import ScrollIntoView from "react-scroll-into-view-if-needed"

export default function Caret() {

    return (
        <ScrollIntoView   options={{block:"start",inline:"center",scrollMode:"always",behavior:"smooth",}} style={{display:"inline"}} >
            <span id='caret' style={{fontFamily:"monospace",fontSize:"40px"}}>
                |
            </span>
        </ScrollIntoView>

    )
}
