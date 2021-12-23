let activeState={
    word:0,
    char:0
};

const handleActiveWordState=(state=activeState,action)=>{
    const final={...state}
    switch(action.type){
        case "ACTIVENEXTWORD":
            final.word+=1
            final.char=0
            return final;
        case "ACTIVENEXTCHAR":
            final.char+=1
            return final;
        case "ACTIVEPREVWORD":
            final.word-=1
            final.char=0
            // Will decide later to add this or not 
            return final;
        case "ACTIVEPREVCHAR":
            final.char-=1
            return final;
        
        case "RESETACTIVESTATE":
            final.word=0
            final.char=0
            return final;
        
        default : return state;
    }
}

export default handleActiveWordState