let liveAccuracyState=0

const handleLiveAccuracyState=(state=liveAccuracyState,action)=>{
    let accuracy=action.payload
    switch(action.type){
        case "RESETLIVEACCURACY":
            return 0;
        case "SETLIVEACCURACY": return accuracy ;
        default : return state;
    }
}

export default handleLiveAccuracyState