import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts';

const LineChart = ({ historyData }) => {

  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];
    if (historyData.prices) {
      historyData.prices.map((item) => {
        dataCopy.push([
          `${new Date(item[0]).toLocaleDateString().slice(0, -5)}`,
          parseFloat(item[1])
        ]);
      })
      setData(dataCopy);
    }
  }, [historyData]);

  console.log(data);
  

  return (
    <Chart
      chartType="LineChart"
      data={data}
      height="100%"
      legendToggle
    />
  )
}

export default LineChart
