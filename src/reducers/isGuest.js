let guestState=true;

const handleGuestState=(state=guestState,action)=>{
    switch(action.type){
        case "SETGUEST": return true;
        case "REMOVEGUEST": return false;
        case "GETGUESTSTATE": return state;
        default : return state;
    }
}

export default handleGuestState