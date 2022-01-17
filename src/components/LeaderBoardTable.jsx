import {React,useState} from 'react'
import { useSelector } from 'react-redux';

var userState

export default function LeaderBoardTable(props) {

    var userIdx=0;

    // var regexForDate = new RegExp('/', 'g');
    
    const [showCount,setShowCount]=useState(10)

    const {leaderBoardData}=props

    userState=useSelector((state)=>{
        return state.handleUserState
    })

    if(userState.userName!==null){
        for(let i=0;i<leaderBoardData.length;i++){
            if(leaderBoardData[i].userName===userState.userName){
                userIdx=i+1;
                break;
            }
        }
    }
    const getTimeString=(time)=>{
        var date=new Date(time)
        // date.setMinutes(date.getMinutes()+30)
        // date.setHours(date.getHours()+5);

        let partsArray=(new Date(date).toString()).split(" ")

        return  partsArray[1]+" "+partsArray[2]+" "+partsArray[3]+" "+partsArray[4];
    }


    return (
        <div>
            <h3 className='text-center' style={{color:"#ffeba7"}}>
                {`${props.language}${props.language==="C"?"/C++":""} ${props.time}s`}
            </h3>
            <table className='table table-striped  table-dark table-hover '>
                <thead>

                    <tr>
                        <th className='w-10 text-center'>#</th>
                        <th className='w-30 text-center'>by</th>
                        <th className='w-10 text-center'>wpm</th>
                        <th className='w-10 text-center'>acc</th>
                        <th className='w-40 text-center'>date</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderBoardData.map((data,idx)=>{
                        if(idx>=showCount){
                            return null
                        }
                        return (
                            <tr key={idx}  style={{color:idx+1===userIdx ? "#ffd651":"white"}}>
                                <td className='text-center'>{idx+1}</td>
                                <td className='text-center'>{data.userName}</td>
                                <td className='text-center'>{data.speed}</td>
                                <td className='text-center'>{data.accuracy} %</td>
                                <td className='text-center'>{getTimeString(data.timeOfTest)}</td>
                            </tr>
                            )
                        })}
                </tbody>
                <tfoot >
                    {
                        userIdx!==0 
                        ?
                        <tr  style={{color:"#ffd651"}}>
                            <td className='text-center'>{userIdx}</td>
                            <td className='text-center'>{leaderBoardData[userIdx-1].userName}</td>
                            <td className='text-center'>{leaderBoardData[userIdx-1].speed}</td>
                            <td className='text-center'>{leaderBoardData[userIdx-1].accuracy} %</td>
                            <td className='text-center'>{getTimeString(leaderBoardData[userIdx-1].timeOfTest)}</td>
                        </tr>
                        :
                        <tr  style={{color:"#ffd651"}}>
                            <td className='text-center'>#</td>
                            <td className='text-center'>--</td>
                            <td className='text-center'>--</td>
                            <td className='text-center'>--</td>
                            <td className='text-center'>--</td>
                        </tr>
                    }
                </tfoot>
            </table>
            {leaderBoardData.length>10 && (
                showCount<leaderBoardData.length ?
                <button  className='btn-2 btn-2-outline-warning  w-100' onClick={()=>setShowCount((prev)=>prev+10)}>Load More </button>
                :
                <button  className='btn-2 btn-2-outline-warning  w-100' onClick={()=>setShowCount(10)}>Show Less </button>
            )
            }
        </div>
    )
}
