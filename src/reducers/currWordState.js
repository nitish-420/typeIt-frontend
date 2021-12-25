
const handleCurrWordState=(state="",action)=>{
    switch(action.type){
        case "SETCURRWORD": return action.payload;
        case "RESETCURRWORD": return "";
        default : return state;
    }
}

export default handleCurrWordState