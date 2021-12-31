export const showAlert=(message,alertType,timeOut=1000)=>dispatch=>{
    dispatch({type:"SETALERT",payload:{message,alertType}})
    setTimeout(()=>{dispatch({type:"REMOVEALERT"})},timeOut)
}
export const setGuest=()=>dispatch=>{
    dispatch({type:"SETGUEST"})
}
export const removeGuest=()=>dispatch=>{
    dispatch({type:"REMOVEGUEST"})
}
export const getGuestState=()=>dispatch=>{
    dispatch({type:"GETGUESTSTATE"})
}

export const setTime=(time)=>dispatch=>{
    dispatch({type:`SET${time}`})
}

export const getTime=()=>dispatch=>{
    dispatch({type:"GETTIMESTATE"})
}

export const setLanguage=(lang)=>dispatch=>{
    dispatch({type:`SET${lang}`})
    if(lang==="English"){
        dispatch({type:"GETWORDS"})
    }
    else{
        dispatch({type:`GET${lang.toUpperCase()}WORDS`})
    }
}

export const getLanguage=()=>dispatch=>{
    dispatch({type:"GETLANGUAGE"})
}


export const getWords=()=>dispatch=>{
    dispatch({type:"GETWORDS"})
}


export const getLanguageWords=(lang)=>dispatch=>{
    dispatch({type:`GET${lang.toUpperCase()}WORDS`})
}

export const updateWords=(idx)=>dispatch=>{
    dispatch({type:"UPDATEWORDS",payload:idx})
}

export const updateLanguageWords=(lang)=>dispatch=>{
    dispatch({type:`UPDATE${lang.toUpperCase()}WORDS`})
}


export const startTest=()=>dispatch=>{
    dispatch({type:"STARTTEST"})
}


export const stopTest=()=>dispatch=>{
    dispatch({type:"STOPTEST"})
}

export const nextActiveWord=()=>dispatch=>{
    dispatch({type:"ACTIVENEXTWORD"})
}

export const activeWordEnd=(presentWordLength)=>dispatch=>{
    dispatch({type:"ACTIVEWORDEND",payload:presentWordLength})
}

export const nextActiveChar=()=>dispatch=>{
    dispatch({type:"ACTIVENEXTCHAR"})
}

export const nextActiveLine=()=>dispatch=>{
    dispatch({type:"ACTIVENEXTLINE"})
}

export const prevActiveChar=()=>dispatch=>{
    dispatch({type:"ACTIVEPREVCHAR"})
}


export const resetPresentWord=()=>dispatch=>{
    dispatch({type:"RESETPRESENTWORD"})
}


export const resetActiveState=()=>dispatch=>{
    dispatch({type:"RESETACTIVESTATE"})
}


export const addCorrectCharacter=(wordIdx,charIdx)=>dispatch=>{
    dispatch({type:"ADDCORRECTCHARACTER",payload:{wordIdx,charIdx}})
}
export const removeCorrectCharacter=(wordIdx,charIdx)=>dispatch=>{
    dispatch({type:"REMOVECORRECTCHARACTER",payload:{wordIdx,charIdx}})
}


export const resetCorrectCharacter=()=>dispatch=>{
    dispatch({type:"RESETCORRECTCHARACTER"})
}


export const setCurrentUser=(user)=> dispatch=>{
    dispatch({type:"SETUSER",payload:user})

}

export const resetCurrentUser=(user)=> dispatch=>{
    dispatch({type:"RESETUSER"})

}

