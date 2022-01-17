import {React,useState} from 'react'

export default function UserAllTestTable(props) {

    // var regexForDate = new RegExp('/', 'g');
    
    const [showCount,setShowCount]=useState(10)

    const {testData}=props
    

    const getTimeString=(time)=>{
        var date=new Date(time)
        // date.setMinutes(date.getMinutes()+30)
        // date.setHours(date.getHours()+5);

        let partsArray=(new Date(date).toString()).split(" ")

        return  partsArray[1]+" "+partsArray[2]+" "+partsArray[3]+" "+partsArray[4];
    }


    return (
        <>
            { (testData.length===0)
            ?
            <div>
                <h1 className='text-center' style={{color:"#ffeba7"}}>
                    Your all test details!!!
                </h1>
                <table className='table table-striped  table-dark table-hover '>
                    <thead>

                        <tr>
                            <th className='text-center'>language</th>
                            <th className='text-center'>time </th>
                            <th className='text-center'>wpm</th>
                            <th className='text-center'>accuracy</th>
                            <th className='text-center'>date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='text-center'>--</td>
                            <td className='text-center'>--</td>
                            <td className='text-center'>--</td>
                            <td className='text-center'>--</td>
                            <td className='text-center'>--</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            :
            <div>
                <h1 className='text-center' style={{color:"#ffeba7"}}>
                    Your all test details!!!
                </h1>
                <table className='table table-striped  table-dark table-hover '>
                    <thead>
                        <tr>
                            <th className='text-center'>language</th>
                            <th className='text-center'>time </th>
                            <th className='text-center'>wpm</th>
                            <th className='text-center'>accuracy</th>
                            <th className='text-center'>date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testData.map((data,idx)=>{
                            if(idx>=showCount){
                                return null
                            }
                            return (
                                <tr key={idx}>
                                    <td className='text-center'>{data.language}{data.language==="C"?"/C++":""}</td>
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
