    // src/App.js
    import React, { useState, useEffect } from 'react';

    import './app.css';
    import MyTable from './MyTable';
    import MyCalendar from './MyCalendar';
    import MyTimeSeries from './MyTimeSeries';

    const App = () => {
        const [startTime, setStartTime] = useState('2021-08-04T08:46:54Z');
        const [endTime, setEndTime] = useState('2021-08-24T13:06:44Z');
        const [chartData, setChartData] = useState([]);
        useEffect(() => {
            const fetchData = async () => {
                // Replace with your actual API call
                let startTimeInSeconds = new Date(startTime)?.getTime();
                let endTimeInSeconds = new Date(endTime)?.getTime();
                const response = await fetch(
                    `/api/chartdata?startTime=${startTimeInSeconds}&endTime=${endTimeInSeconds}`
                );
                const result = await response.json();
                setChartData(result);
            };
            fetchData();
        },[startTime, endTime]);
        
        const handleCalendarTime = (time, type) => {
            if (type === 'START') {
                setStartTime(time);
            } else if (type === 'END') {
                setEndTime(time);
            }
        }

        return (
            <div>   
                <h1 class="mt-10 mb-10 text-center text-4xl text-red-600 font-bold">Smokescreen Report</h1>  
                <div class="bg-[#efefef66] mb-20">
                    <h2 class="pl-20 pt-10 text-left text-2xl font-bold">Time Series</h2>
                    <div>
                        <div class="flex ml-20 mt-5">
                            <div class="w-64 bg-[#e9ebf0] p-4">
                                <div>Start Time</div>
                                <MyCalendar initialTime={'2021-08-04T08:46:54Z'} handleSubmit={handleCalendarTime} type={'START'}/>
                            </div>
                            <div class="w-64 bg-[#e9ebf0] p-4">
                                <div>End Time</div>
                                <MyCalendar initialTime={'2021-08-24T13:06:44Z'} handleSubmit={handleCalendarTime} type={'END'} />
                            </div>
                        </div>
                        <div class="mt-10 ml-10">
                            <MyTimeSeries data={chartData} />
                        </div>                    
                    </div>
                </div>
                <div class="bg-[#efefef66] mb-20">
                    <h2 class="pt-15 text-center text-4xl font-bold">Detailed Report</h2>
                    <div class="m-10">
                        <MyTable />
                    </div>
                </div>
            </div>
        );
    }

    export default App;