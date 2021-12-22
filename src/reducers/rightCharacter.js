let rightCharacterState=new Set();


const handleRightCharacterState=(state=rightCharacterState,action)=>{
    switch(action.type){
        case "ADDCORRECTCHARACTER":
            state.add(action.payload.wordIdx*100+action.payload.charIdx)
            return state;
        case "REMOVECORRECTCHARACTER":
            state.delete(action.payload.wordIdx*100+action.payload.charIdx-1)
            return state;
        case "RESETCORRECTCHARACTER": 
            return new Set();
        default : return state;
    }
}

export default handleRightCharacterState