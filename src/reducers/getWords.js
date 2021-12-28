import {words} from "../helpers/updatedWords.json"
import {pythonLines} from "../helpers/pythonCode.json"

var index;
var wordsToRenderOnce=25
var linesToRenderOnce=2
const handleWordState=(state=[],action)=>{

    let data=[]
    let idx
    switch(action.type){
        case "GETWORDS":
            idx=Math.floor(Math.random() * (words.length-wordsToRenderOnce));
            for(let i=idx;i<idx+wordsToRenderOnce;i++){
                data.push(words[i])
            }
            index=(idx+wordsToRenderOnce)%words.length
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
        case "GETPYTHONWORDS":
            idx=Math.floor(Math.random() * (pythonLines.length-linesToRenderOnce));
            for(let i=idx;i<idx+linesToRenderOnce;i++){
                data.push(pythonLines[i])
            }
            index=(idx+linesToRenderOnce)%pythonLines.length
            return data
        case "UPDATEPYTHONWORDS":
            for(let i=1;i<state.length;i++){
                data.push(state[i])
            }
            data.push(pythonLines[index])
            index=(index+1)%pythonLines.length;
            return data
        default : return state;
    }
}

export default handleWordState