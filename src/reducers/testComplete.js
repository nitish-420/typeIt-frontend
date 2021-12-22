let testState=false

const handleTestCompleteState=(state=testState,action)=>{
    switch(action.type){
        case "COMPLETETEST": return true;
        case "INCOMPLETETEST": return false;
        default : return state;
    }
}

export default handleTestCompleteState