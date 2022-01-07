import {React,useState} from 'react'

export default function UserAllTestTable(props) {

    var regexForDate = new RegExp('/', 'g');
    
    const [showCount,setShowCount]=useState(10)

    const {testData}=props
    

    const getTimeString=(time)=>{
        var changedDate = (new Date(time).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})).replace(regexForDate,"-");
        return changedDate
    }




    return (
        <>
            {testData[0]===null?null:
            <div>
                <h1 className='text-center'>
                    Your all test details!!!
                </h1>
                <table className='table table-striped  table-dark table-hover '>
                    <thead>

                        <tr>
                            <th className='text-center'>Language</th>
                            <th className='text-center'>Time </th>
                            <th className='text-center'>Speed(wpm)</th>
                            <th className='text-center'>Accuracy</th>
                            <th className='text-center'>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testData.map((data,idx)=>{
                            if(idx>=showCount){
                                return null
                            }
                            return (
                                <tr key={idx}>
                                    <td className='text-center'>{data.language}</td>
                                    <td className='text-center'>{data.testTime}</td>
                                    <td className='text-center'>{data.speed}</td>
                                    <td className='text-center'>{data.accuracy} %</td>
                                    <td className='text-center'>{getTimeString(data.timeOfTest)}</td>
                                </tr>
                                )
                            })}
                    </tbody>
                </table>
                {
                    testData.length>10 && (
                    showCount<testData.length ?
                    <button  className='btn-2 btn-2-outline-warning  w-100' onClick={()=>setShowCount((prev)=>prev+10)}>Load More </button>
                    :
                    <button  className='btn-2 btn-2-outline-warning  w-100' onClick={()=>setShowCount(10)}>Show Less </button>
                    )
                }
            </div>
            }
        </>
    )
}
