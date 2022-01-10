import React from 'react'
export default function Character(props) {

    return (
        <span className={`everyChar d-inline-block text-center`} >
            {props.char}
        </span>
    )
}
