import React from 'react'

import { useSelector } from 'react-redux'

function Alert(){

    const alert=useSelector((state)=>{
        return state.showTheAlert
    })


    return (
        <div style={{height:"40px"}}>
            {alert &&
            <div className={`alert alert-${alert.alertType} `} role="alert">
                {alert.message}
            </div>}
            
        </div>
    )
}

export default Alert