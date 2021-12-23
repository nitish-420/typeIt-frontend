// let testState=false

const handleTestState=(state=false,action)=>{
    switch(action.type){
        case "STARTTEST": return true;
        case "STOPTEST": return false;
        default : return state;
    }
}

export default handleTestState