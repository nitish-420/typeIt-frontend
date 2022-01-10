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

export const setLanguage=(lang)=>dispatch=>{
    dispatch({type:`SET${lang}`})
    if(lang==="English"){
        dispatch({type:"GETWORDS"})
    }
    else{
        dispatch({type:`GET${lang.toUpperCase()}WORDS`})
    }
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

export const setCurrentUser=(user)=> dispatch=>{
    dispatch({type:"SETUSER",payload:user})

}

export const resetCurrentUser=(user)=> dispatch=>{
    dispatch({type:"RESETUSER"})

}
