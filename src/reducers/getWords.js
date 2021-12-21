import {words} from "../helpers/words.json"

const handleWordState=async(state=[],action)=>{
    const data=[]

    let idx=Math.floor(Math.random() * (10000 + 1));
    
    for(let i=idx;i<idx+250;i++){
        data.push(words[i])
    }

    switch(action.type){
        case "GETWORDS":
            return data
        default : return state;
    }
}

export default handleWordState