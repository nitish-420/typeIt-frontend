
const handleLiveTimerState=(state=null,action)=>{
    switch(action.type){
        case "RESETLIVETIMER": 
            return null;
        case "SETLIVETIMER": 
            let time=action.payload
            return time;
        default : return state;
    }
}

export default handleLiveTimerState