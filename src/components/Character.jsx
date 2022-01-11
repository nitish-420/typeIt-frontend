import React from 'react'
export default function Character(props) {

    return (
        <span className={`everyChar text-center`} >
            {props.char}
        </span>
    )
}
