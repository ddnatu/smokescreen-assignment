
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

interface MyDataType {
    payload?: any; // payload is now optional
    label?: any;
    active?: any;
}

const dateFormatter = (tickItem) => {
  // Assuming tickItem is a date string or timestamp
  let tt = new Date(tickItem).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }); // e.g., "Oct 20"
  return tt; 
};

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center" as const,
};

const ticks = [1628066814000, 1628153214000, 1628239614000, 1628326014000, 1628412414000, 1628498814000, 1628585214000, 1628671614000, 1628758014000, 1628844414000, 1628930814000, 1629017214000, 1629103614000, 1629190014000, 1629276414000, 1629362814000, 1629449214000, 1629535614000, 1629622014000, 1629708414000, 1629794814000];

const yTicks = [
  0,50,100,150,200,250,300,350,400,450,500
];

const tooltipStyles = {
  background: "#eac4c4ff",
  padding: "8px",
  border: "1px solid",
};

function CustomTooltip({ payload, label, active }: MyDataType) {
  const details = payload[0]?.payload;
  if (details && details.otherDetails && details.otherDetails.length) {
    const totalEvents = details.otherDetails.length;
    const dateOfEvent = details.dateMapStr;
    if (active) {
      return (
        <div style={tooltipStyles}>
          <p className={label}>{`There were total of ${totalEvents} events on ${dateOfEvent}`}</p>
        </div>
      );
    }
  }
  return null;
}

const getTransformedData = (data) => {
  const transformedData = data.map((item, index) => {
    let gtdData = new Date(item.timestamp).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }); // e.g., "Oct 20"
    return {
      date: new Date(item.timestamp).getTime(), // e.g., "Oct 20",
      dateMapStr: gtdData,
      value: 1,
      otherDetails: [{...item}]
    };
  });

  let newData = [];
  transformedData.forEach((entity, index) => {
    let resultFind = newData.find(({dateMapStr}) => dateMapStr === entity.dateMapStr);
    if (resultFind) {
      resultFind.value += 1;
      resultFind.otherDetails = resultFind.otherDetails.concat(entity.otherDetails);
    } else {
      newData.push(entity);
    }
  });
  return newData.reverse();
  // return transformedData.reverse();
}

const MyTimeSeries = ({data}) => {
    const transformedData = getTransformedData(data);
    return (
        <div style={styles}>
          <LineChart
            width={1200}
            height={500}
            data={transformedData}
            margin={{ top: 5, right: 50, bottom: 5, left: 0 }}
            >
            <Line type="monotone" dataKey="value" stroke="#f51f31ff" dot={true} />
            <CartesianGrid stroke="#6b6666ff" strokeDasharray="1 1" vertical={false} />
            <XAxis
                dataKey="date"
                type="number"
                domain={['Aug 1', 'Aug 28']}
                // domain={['auto', 'auto']}
                tickFormatter={dateFormatter}
                ticks={ticks}
                interval={1}
            />
            <YAxis
              type="number"
              ticks={yTicks}
            />
            <Tooltip content={<CustomTooltip />} position={{ y: 0 }} />
          </LineChart>
        </div>
    );
};

export default MyTimeSeries;