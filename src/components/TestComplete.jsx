import {React,useRef,useEffect} from 'react'

export default function TestComplete(props) {
    
    const {resetLiveTest}=props

    const resetButton=useRef(null)

    useEffect(()=>{
        if(resetButton){
            resetButton.current.focus()
        }
    },[resetButton])


    return (
        <div>
            Test completed !!!
            <button ref={resetButton} onClick={()=>{resetLiveTest()}}>Restart </button>
        </div>
    )
}
