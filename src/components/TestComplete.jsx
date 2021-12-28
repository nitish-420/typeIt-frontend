import {React,useRef,useEffect} from 'react'

export default function TestComplete(props) {
    
    const {resetLiveTest}=props

    const resetButton=useRef(null)

    useEffect(()=>{
        if(resetButton.current){
            resetButton.current.focus()
        }
    },[resetButton])


    return (
        <div>
            Test completed !!!
            <hr/>
            <button className='btn btn-warning' ref={resetButton} onClick={()=>{resetLiveTest()}}>Next Test </button>
        </div>
    )
}
