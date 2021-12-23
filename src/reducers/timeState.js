const initialTimeState=null

const handleRunningTimeState=(state=initialTimeState,action)=>{
    switch(action.type){
        case "RESETTIMESTATE": 
            return null;
        case "STARTTIMESTATE": 
            return Date.now()
        default : return state;
    }
}

export default handleRunningTimeState