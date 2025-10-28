    var sampleData = require('./data.json');
    // index.js
    const express = require('express');
    const app = express();
    const port = process.env.PORT || 5000;

    app.get('/api/hello', (req, res) => {
        res.json({ message: 'Hello from the backend!' });
    });

    app.get('/api/data', (req, res) => {
        const pageCount = Math.ceil(sampleData.length / 10);
        let page = parseInt(req.query.page);
 
        if (!page) { page = 1;}
        if (page > pageCount) {
            page = pageCount
        }
        let tempData = sampleData.slice(page * 10 - 10, page * 10);
        let transformedNewData = [];
        tempData.forEach((m) => {
            let tempObj = {};
            tempObj['attackerId'] = m['attacker.id'];
            tempObj['attackerIp'] = m['attacker.ip'];
            tempObj['attackerPort'] = m['attacker.port'];
            tempObj['attackerName'] = m['attacker.name'];
            tempObj['decoyId'] = m['decoy.id'];
            tempObj['decoyName'] = m['decoy.name'];
            tempObj['decoyGroup'] = m['decoy.group'];
            tempObj['decoyIp'] = m['decoy.ip'];
            tempObj['decoyPort'] = m['decoy.port'];
            tempObj['decoyType'] = m['decoy.type'];
            tempObj['id'] = m.id;
            tempObj['type'] = m.type;
            tempObj['timestamp'] = m.timestamp;
            tempObj['severity'] = m.severity;
            tempObj['kill_chain_phase'] = m.kill_chain_phase;
            transformedNewData.push(tempObj);
        });
        res.json({
            "page": page,
            "pageCount": pageCount,
            // "posts": sampleData.slice(page * 10 - 10, page * 10)
            "posts": transformedNewData
        });

        // res.json({ response: sampleData})
    });

    app.get('/api/chartdata', (req, res) => {
        let {startTime, endTime} = req.query;
        try {
            // const start = new Date(startDate);
            // const end = new Date(endDate);
            // Filter the data based on the date range
            // const filteredData = sampleData.filter(item => {
            //     const itemDate = new Date(item.timestamp);
            //     return itemDate >= start && itemDate <= end;
            // });

            const filteredData = sampleData.filter(item => {
                const itemDate = new Date(item.timestamp)?.getTime();
                return itemDate >= parseInt(startTime) && itemDate <= parseInt(endTime);
            });


            // Send the filtered data as a JSON response
            res.json(filteredData);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).json({ error: 'Failed to parse JSON data' });
        }
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });