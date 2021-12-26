const handleWrongCountState=(state=0,action)=>{
    switch(action.type){
        case "CHANGEWRONGCOUNT": return state+action.payload;
        case "RESETWRONGCOUNT": return 0;
        default : return state;
    }
}

export default handleWrongCountState