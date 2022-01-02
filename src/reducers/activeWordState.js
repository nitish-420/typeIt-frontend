let activeState={
    line:0,
    word:0
};

const handleActiveWordState=(state=activeState,action)=>{
    const final={...state}
    switch(action.type){
        case "ACTIVENEXTWORD":
            final.word+=1
            return final;
        case "ACTIVEPREVWORD":
            final.word-=1
            // Will decide later to add this or not 
            return final;
            
        case "ACTIVENEXTLINE":
            final.line+=1
            final.word=0
            return final;

        case "RESETACTIVESTATE":
            final.line=0
            final.word=0
            return final;
        
        default : return state;
    }
}

export default handleActiveWordState