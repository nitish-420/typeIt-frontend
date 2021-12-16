export const showAlert=(message,alertType,timeOut=500)=>dispatch=>{
    dispatch({type:"SETALERT",payload:{message,alertType}})
    setTimeout(()=>{dispatch({type:"REMOVEALERT"})},timeOut)
}
