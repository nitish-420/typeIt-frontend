const handleRightCharacterState=(state=new Set(),action)=>{
    switch(action.type){
        case "ADDCORRECTCHARACTER":
            let addedSet=new Set(state)
            addedSet.add(action.payload.wordIdx*100+action.payload.charIdx)
            return addedSet;
        case "REMOVECORRECTCHARACTER":
            let removedSet=new Set(state)
            removedSet.delete(action.payload.wordIdx*100+action.payload.charIdx-1)
            return removedSet;
        case "RESETCORRECTCHARACTER": 
            return new Set();
        default : return state;
    }
}

export default handleRightCharacterState