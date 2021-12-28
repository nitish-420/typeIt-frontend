let timeState=15;

const handleTimeState=(state=timeState,action)=>{
    let prev=state
    switch(action.type){
        case "SET15": return 15;
        case "SET30": return 30;
        case "SET60": return 60;
        case "SET120": return 120;
        case "GETTIMESTATE": return prev;
        default : return state;
    }
}

export default handleTimeState