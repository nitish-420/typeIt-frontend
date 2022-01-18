import React from 'react'
import {ComposedChart,Label,Area,XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const time120=[0,6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108, 114,120]
const time60=[0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60]
const time30=[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30]
const time15=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

const CurrentTestChart = (props) => {

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip px-2" style={{ backgroundColor: 'black', opacity: "0.7" }}>
                    <p className="m-0 p-0">{`${label}`}</p>
                    <p className="desc m-0 p-0">{`wpm: ${payload[0].value}`}</p>
                    <p className="desc m-0 p-0">{`acc: ${props.testChartStates[label].accuracy}`}</p>
                    <p className="desc m-0 p-0">{`right: ${props.testChartStates[label].rightCount}`}</p>
                    <p className="desc m-0 p-0">{`wrong: ${props.testChartStates[label].wrongCount}`}</p>
                </div>
            );
        }

        return null;
    };


    const MAX=props.testTime
    var tickArray
    if(MAX===120){
        tickArray=time120
    }
    else if(MAX===60){
        tickArray=time60
    }
    else if(MAX===30){
        tickArray=time30
    }
    else{
        tickArray=time15
    }

    return (
        <ResponsiveContainer width="100%" aspect={3.8}>
            <ComposedChart
                width={500}
                height={300}
                data={props.testChartStates}
                margin={{
                    top:10,
                    right: 10,
                    left: 0,
                    bottom: 20,
                }}
            >
                <defs>
                    <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="1%" stopColor="#8884d8" stopOpacity={0.3} />
                        <stop offset="99%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorWrong" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="1%" stopColor="red" stopOpacity={0.5} />
                        <stop offset="99%" stopColor="red" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid opacity={0.07} horizontal="true" vertical="" />
                <XAxis ticks={tickArray} dataKey="time"  interval="preserveStartEnd">
                    <Label value={`${props.language} ${MAX}s`} position="outsideCenter" fill='#ffeba7' dy={25} fontSize={18}/>
                </XAxis>
                <YAxis >
                    <Label value="WPM" position="outsideCenter" fill='#ffeba7' angle={-90} dx={-20} fontSize={22}/>
                </YAxis>
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" stackId={1} dataKey="speed" stroke="#8884d8" activeDot={{ r: 5 }} dot={{ r: 4 }} fillOpacity={1} fill="url(#colorSpeed)" />
                <Area type="monotone" stackId={0} dataKey="wrongCount" stroke="none" activeDot={{ r: 4,opacity:"0.3" }}  fillOpacity={1} fill="url(#colorWrong)" />
            </ComposedChart>
        </ResponsiveContainer>
    );
}

export default CurrentTestChart