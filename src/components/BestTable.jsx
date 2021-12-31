import React from 'react'

export default function BestTable(props) {

    const {language,bestData}=props
    const {time15,time30,time60,time120}=bestData

    const getTimeString=(time)=>{
        const s=time.split("T")
        return s[0]+" "+(s[1].split("."))[0]
    }

    return (
        <div>
            <h1 className='text-center'>
                {language}
            </h1>
            <table className='table table-striped  table-dark table-hover '>
                <thead>

                    <tr>
                        <th className='text-center'>Time</th>
                        <th className='text-center'>Best Speed</th>
                        <th className='text-center'>Best Accuracy</th>
                        <th className='text-center'>Date</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td className='text-center'>15</td>
                        <td className='text-center'>{time15!==null ? time15.speed:"--"}</td>
                        <td className='text-center'>{time15!==null ? time15.accuracy+" %":"--"}</td>
                        <td className='text-center'>{time15!==null ? getTimeString(time15.timeOfTest):"--"}</td>
                    </tr>
                    <tr>
                        <td className='text-center'>30</td>
                        <td className='text-center'>{time30!==null ? time30.speed:"--"}</td>
                        <td className='text-center'>{time30!==null ? time30.accuracy+" %":"--"}</td>
                        <td className='text-center'>{time30!==null ? getTimeString(time30.timeOfTest):"--"}</td>
                    </tr>
                    <tr>
                        <td className='text-center'>60</td>
                        <td className='text-center'>{time60!==null ? time60.speed:"--"}</td>
                        <td className='text-center'>{time60!==null ? time60.accuracy+" %":"--"}</td>
                        <td className='text-center'>{time60!==null ? getTimeString(time60.timeOfTest):"--"}</td>
                    </tr>
                    <tr>
                        <td className='text-center'>120</td>
                        <td className='text-center'>{time120!==null ? time120.speed:"--"}</td>
                        <td className='text-center'>{time120!==null ? time120.accuracy+" %":"--"}</td>
                        <td className='text-center'>{time120!==null ? getTimeString(time120.timeOfTest):"--"}</td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}
