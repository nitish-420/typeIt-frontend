import {words} from "../helpers/updatedWords.json"


const handleWordState=(state=[],action)=>{

    // let idx=Math.floor(Math.random() * (10000 + 1));
    
    // for(let i=idx;i<idx+50;i++){
    //     data.push(words[i])
    // }

    switch(action.type){
        case "GETWORDS":
            words.sort(()=>Math.random()-0.5)
            return [...words]
        default : return state;
    }
}

export default handleWordState