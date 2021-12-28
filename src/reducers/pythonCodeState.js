// import {words} from "../helpers/pythonCode.json"

// var index;
// var linesToRenderOnce=3
// const handlePythonWordState=(state=[],action)=>{

//     let data=[]
//     let idx
//     switch(action.type){
//         case "GETPYTHONWORDS":
//             idx=Math.floor(Math.random() * (words.length-linesToRenderOnce));
//             for(let i=idx;i<idx+linesToRenderOnce;i++){
//                 data.push(words[i])
//             }
//             index=idx+linesToRenderOnce
//             return data
//         case "UPDATEPYTHONWORDS":
//             idx=action.payload
//             for(let i=idx;i<state.length;i++){
//                 data.push(state[i])
//             }
//             for(let i=0;i<idx;i++){
//                 data.push(words[index])
//                 index=(index+1)%words.length;
//             }

//             return data
//         default : return state;
//     }
// }

// export default handlePythonWordState