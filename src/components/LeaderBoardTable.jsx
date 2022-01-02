import {React,useState} from 'react'

export default function LeaderBoardTable(props) {

    var regexForDate = new RegExp('/', 'g');
    
    const [showCount,setShowCount]=useState(10)

    const {leaderBoardData}=props
    

    const getTimeString=(time)=>{
        var changedDate = (new Date(time).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})).replace(regexForDate,"-");
        return changedDate
    }

    return (
        <div>
            <h1 className='text-center'>
                {`${props.language}-----${props.time}s`}
            </h1>
            <table className='table table-striped  table-dark table-hover '>
                <thead>

                    <tr>
                        <th className='text-center'>Rank</th>
                        <th className='text-center'>User Name</th>
                        <th className='text-center'>Speed(wpm)</th>
                        <th className='text-center'>Accuracy</th>
                        <th className='text-center'>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderBoardData.map((data,idx)=>{
                        if(idx>=showCount){
                            return null
                        }
                        return (
                            <tr key={idx}>
                                <td className='text-center'>{idx+1}</td>
                                <td className='text-center'>{data.userName}</td>
                                <td className='text-center'>{data.speed}</td>
                                <td className='text-center'>{data.accuracy} %</td>
                                <td className='text-center'>{getTimeString(data.timeOfTest)}</td>
                            </tr>
                            )
                        })}
                </tbody>
            </table>
            {
                showCount<leaderBoardData.length ?
                <button  className='btn btn-light  w-100' onClick={()=>setShowCount((prev)=>prev+10)}>Load More </button>
                :
                <button  className='btn btn-light  w-100' onClick={()=>setShowCount(10)}>Show Less </button>
                
            }
        </div>
    )
}
