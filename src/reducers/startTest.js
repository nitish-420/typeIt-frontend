let testState=false

const handleTestState=(state=testState,action)=>{
    switch(action.type){
        case "STARTTEST": return true;
        case "STOPTEST": return false;
        default : return state;
    }
}

export default handleTestState