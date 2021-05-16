import React,{useState,useEffect} from "react";
import styled from "styled-components";
import numeral from 'numeral';

import { Line } from 'react-chartjs-2';
const options = {
  legend: {
    display:false,
  },
elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0.0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
}
function LineGraph({casesType="cases",...props}) {
  const [data, setData] = useState({});
  
  const buildChartData = (data) => {
    const chartData=[];
    let lastDataPoint;
    for (let date in data[casesType]) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y:data[casesType][date]-lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/IN?lastdays=120").then(response => response.json()).then(data => {
        const chartData = buildChartData(data.timeline);
        setData(chartData);
      });
    }
    fetchData();
  }, []);
  console.log(data);
  return <Container>
    {data?.length > 0 && (
      <Line options={options}
        data={{
          datasets: [
            {
              label:"Cases",
              backgroundColor: "rgba(204,16,52,0.5)",
              borderColor: "blue",
              data:data,
            },
            // {
            //   label:"Recovered",
            //   borderColor: "#32CD32",
            //   data:recoveredData,
            // },
      ]}}/>
    )}

  </Container>;
}


const Container = styled.div`
grid-area:map;
margin-bottom:20px;
height:500px;
background-color:white;
padding:4px;
border-radius:20px;
margin-top:16px;
box-shadow:0 0 8px -4px rgba(0, 0, 0, 0.5);
`;
export default LineGraph;
