let liveWpmState=0

const handleLiveWpmState=(state=liveWpmState,action)=>{
    let wpm=action.payload
    switch(action.type){
        case "RESETLIVEWPM": 
            return 0;
        case "SETLIVEWPM":  
            return wpm;
        default : return state;
    }
}

export default handleLiveWpmState