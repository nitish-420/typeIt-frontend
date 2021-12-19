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