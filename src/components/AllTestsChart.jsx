import React from 'react'
import { useSelector } from 'react-redux'
import { AreaChart,Label ,Area, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

var userState



const AllTestsChart = () => {

    userState = useSelector((state) => {
        return state.handleUserState
    })

    const getTimeString = (time) => {
        var date = new Date(time)
        // date.setMinutes(date.getMinutes()+30)
        // date.setHours(date.getHours()+5);

        let partsArray = (new Date(date).toString()).split(" ")

        return partsArray[1] + " " + partsArray[2] + " " + partsArray[3] + " " + partsArray[4].slice(0, -3);
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip px-2" style={{ backgroundColor: 'black', opacity: "0.7" }}>
                    <p className="desc m-0 p-0">{`wpm: ${payload[0].value}`}</p>
                    <p className="desc m-0 p-0">{`accuracy: ${userState.tests[label].accuracy}`}</p>
                    <p className="desc m-0 p-0">{`type: ${userState.tests[label].language} ${userState.tests[label].testTime}`}</p>
                    <p className="desc m-0 p-0">{`date: ${getTimeString(userState.tests[label].timeOfTest)}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <ResponsiveContainer width="100%" aspect={3}>
            <AreaChart
                width={500}
                height={300}
                data={userState.tests}
                margin={{
                    top: 15,
                    right: 30,
                    left: 0,
                    bottom: 5,
                }}
            >
                <defs>
                    <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="1%" stopColor="#8884d8" stopOpacity={0.3} />
                        <stop offset="99%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid opacity={0.07} horizontal="true" vertical="" />
                <YAxis >
                    <Label value="Words per Minute" position="outsideCenter" fill='#ffeba7' angle={-90} dx={-20} fontSize={17}/>
                </YAxis>
                <Tooltip content={<CustomTooltip />} />                
                <Area type="linear" dataKey="speed" stroke="#8884d8" activeDot={{ r: 5 }} dot={{ r: 4 }} fillOpacity={1} fill="url(#colorSpeed)" />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default AllTestsChart