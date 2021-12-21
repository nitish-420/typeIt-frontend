let restartState=false;

const handleRestartState=(state=restartState,action)=>{
    switch(action.type){
        case "ONRESTART": return true;
        case "OFFRESTART": return false;
        default : return state;
    }
}

export default handleRestartState