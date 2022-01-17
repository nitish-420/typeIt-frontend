import React from 'react'

export default function BestTable(props) {

    // var regexForDate = new RegExp('/', 'g');
    
    const {bestData}=props
    const {time15,time30,time60,time120}=bestData

    const getTimeString=(time)=>{
        var date=new Date(time)
        // date.setMinutes(date.getMinutes()+30)
        // date.setHours(date.getHours()+5);
        //no need to add 5.5 hours like done above because local timezone feature is added database

        let partsArray=(new Date(date).toString()).split(" ")

        return  partsArray[1]+" "+partsArray[2]+" "+partsArray[3]+" "+partsArray[4];
    }

    return (
        <div>
            <table className='table table-striped  table-dark table-hover '>
                <thead>

                    <tr>
                        <th className='w-20 text-center'>time</th>
                        <th className='w-20 text-center'>wpm</th>
                        <th className='w-20 text-center'>accuracy</th>
                        <th className='w-40 text-center'>date</th>
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
