import {words} from "../helpers/updatedWords.json"

var index;

const handleWordState=(state=[],action)=>{

    let data=[]
    let idx
    switch(action.type){
        case "GETWORDS":
            idx=Math.floor(Math.random() * (words.length));
            for(let i=idx;i<idx+25;i++){
                data.push(words[i])
            }
            index=idx+20
            return data
        case "UPDATEWORDS":
            idx=action.payload
            for(let i=idx;i<state.length;i++){
                data.push(state[i])
            }
            for(let i=0;i<idx;i++){
                data.push(words[index])
                index=(index+1)%words.length;
            }

            return data
        default : return state;
    }
}

export default handleWordState