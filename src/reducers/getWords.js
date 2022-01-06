import {words} from "../helpers/updatedWords.json"
import {pythonLines} from "../helpers/pythonCode.json"
import {cLines} from "../helpers/cCode.json"
import {javascriptLines} from "../helpers/javascriptCode.json"
import {javaLines} from "../helpers/javaCode.json"

var index;
var wordsToRenderOnce=30
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
        case "GETCWORDS":
            idx=Math.floor(Math.random() * (cLines.length-linesToRenderOnce));
            for(let i=idx;i<idx+linesToRenderOnce;i++){
                data.push(cLines[i])
            }
            index=(idx+linesToRenderOnce)%cLines.length
            return data
        case "UPDATECWORDS":
            for(let i=1;i<state.length;i++){
                data.push(state[i])
            }
            data.push(cLines[index])
            index=(index+1)%cLines.length;
            return data

        case "GETJAVASCRIPTWORDS":
            idx=Math.floor(Math.random() * (javascriptLines.length-linesToRenderOnce));
            for(let i=idx;i<idx+linesToRenderOnce;i++){
                data.push(javascriptLines[i])
            }
            index=(idx+linesToRenderOnce)%javascriptLines.length
            return data

        case "UPDATEJAVASCRIPTWORDS":
            for(let i=1;i<state.length;i++){
                data.push(state[i])
            }
            data.push(javascriptLines[index])
            index=(index+1)%javascriptLines.length;
            return data
        case "GETJAVAWORDS":
            idx=Math.floor(Math.random() * (javaLines.length-linesToRenderOnce));
            for(let i=idx;i<idx+linesToRenderOnce;i++){
                data.push(javaLines[i])
            }
            index=(idx+linesToRenderOnce)%javaLines.length
            return data

        case "UPDATEJAVAWORDS":
            for(let i=1;i<state.length;i++){
                data.push(state[i])
            }
            data.push(javaLines[index])
            index=(index+1)%javaLines.length;
            return data
        default : return state;
    }
}

export default handleWordState