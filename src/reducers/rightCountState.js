const handleRightCountState=(state=0,action)=>{
    switch(action.type){
        case "CHANGERIGHTCOUNT": return state+action.payload;
        case "RESETRIGHTCOUNT": return 0;
        default : return state;
    }
}

export default handleRightCountState