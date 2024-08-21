import { LineChart, Line } from 'recharts';

const LineChartt = ({ timeseries, homePage }) => {
  console.log('timeseries', timeseries)
  // console.log('timeseries',timeseries )
  const data = []
  if (homePage == false) {

    for (var s in timeseries) {
      data.push({ index: s, value: timeseries[s] })
    }
  } else {
    for (var s in timeseries) {
      data.push({ index: s, value: timeseries[s].close })
    }
  }

  return (

    <LineChart width={200} height={60} data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5, padding: '2rem' }}>
      <Line dot={false} typepe="monotone" dataKey="value" stroke="#23FF86" />
    </LineChart>
  )
}

export default LineChartt;