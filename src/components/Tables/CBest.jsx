import React from 'react'

export default function CBest(props) {

    const {language,bestData}=props
    const {time15,time30,time60,time120}=bestData

    return (
        <div>
            <table className='bestRecords'>
                <div className='language'>{language}</div>

                <tr>
                    <th>Time</th>
                    <th>Best Speed</th>
                    <th>Best Accuracy</th>
                    <th>Date</th>
                </tr>
                <tr>
                    <td>15</td>
                    <td>{time15!==null ? time15.speed:"--"}</td>
                    <td>{time15!==null ? time15.accuracy:"--"}</td>
                    <td>{time15!==null ? time15.timeOfTest:"--"}</td>
                </tr>
                <tr>
                    <td>30</td>
                    <td>{time30!==null ? time30.speed:"--"}</td>
                    <td>{time30!==null ? time30.accuracy:"--"}</td>
                    <td>{time30!==null ? time30.timeOfTest:"--"}</td>
                </tr>
                <tr>
                    <td>60</td>
                    <td>{time60!==null ? time60.speed:"--"}</td>
                    <td>{time60!==null ? time60.accuracy:"--"}</td>
                    <td>{time60!==null ? time60.timeOfTest:"--"}</td>
                </tr>
                <tr>
                    <td>120</td>
                    <td>{time120!==null ? time120.speed:"--"}</td>
                    <td>{time120!==null ? time120.accuracy:"--"}</td>
                    <td>{time120!==null ? time120.timeOfTest:"--"}</td>
                </tr>

            </table>
        </div>
    )
}
