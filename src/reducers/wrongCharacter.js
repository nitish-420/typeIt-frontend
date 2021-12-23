let wrongCharacterState=new Set();


const handleWrongCharacterState=(state=wrongCharacterState,action)=>{
    switch(action.type){
        case "ADDWRONGCHARACTER":
            let addedSet=new Set(state)
            addedSet.add(action.payload.wordIdx*100+action.payload.charIdx)
            return addedSet;
        case "REMOVEWRONGCHARACTER":
            let removedSet=new Set(state)
            removedSet.delete(action.payload.wordIdx*100+action.payload.charIdx-1)
            return removedSet;
        case "RESETWRONGCHARACTER": 
            return new Set();
        default : return state;
    }
}

export default handleWrongCharacterState