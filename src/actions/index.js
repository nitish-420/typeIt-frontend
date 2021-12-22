export const showAlert=(message,alertType,timeOut=500)=>dispatch=>{
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
}

export const getLanguage=()=>dispatch=>{
    dispatch({type:"GETLANGUAGE"})
}


export const onRestart=()=>dispatch=>{
    dispatch({type:"ONRESTART"})
}

export const offRestart=()=>dispatch=>{
    dispatch({type:"OFFRESTART"})
}

export const getWords=()=>dispatch=>{
    dispatch({type:"GETWORDS"})
}


export const startTest=(time)=>dispatch=>{
    dispatch({type:"INCOMPLETETEST"})
    dispatch({type:"STARTTEST"})
    setTimeout(()=>{
        dispatch({type:"STOPTEST"})
        dispatch({type:"COMPLETETEST"})
    },time*1000)
}

export const resetCompleteTestState=()=>dispatch=>{
    dispatch({type:"INCOMPLETETEST"})

}

export const stopTest=()=>dispatch=>{
    dispatch({type:"STOPTEST"})
    dispatch({type:"OFFRESTART"})
}

export const nextActiveWord=()=>dispatch=>{
    dispatch({type:"ACTIVENEXTWORD"})
}

export const nextActiveChar=()=>dispatch=>{
    dispatch({type:"ACTIVENEXTCHAR"})
}

export const prevActiveWord=()=>dispatch=>{
    dispatch({type:"ACTIVEPREVWORD"})
}

export const prevActiveChar=()=>dispatch=>{
    dispatch({type:"ACTIVEPREVCHAR"})
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


