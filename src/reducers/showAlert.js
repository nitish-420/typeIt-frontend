const initialState=null;

const showTheAlert=(state=initialState,action)=>{
    switch(action.type){
        case "SETALERT": return action.payload;
        case "REMOVEALERT": return null;
        default : return state;
    }
}

export default showTheAlert