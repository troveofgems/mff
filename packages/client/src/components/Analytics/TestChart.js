import React, {useState, useEffect} from 'react';
import Moment from 'react-moment';

import "./styles/TestChart.css";
const TestChart = () => {
  const [chartData, setChartData] = useState([
    {name: "Mon", value: 20},
    {name: "Tue", value: 30},
    {name: "Wed", value: 40},
    {name: "Thu", value: 2},
    {name: "Fri", value: 2},
    {name: "Sat", value: 2},
    {name: "Sun", value: 2},
  ]);

  useEffect(() => {
  }, []);

  const ConstructBarGroup = (barHeight, dataNode) => {
    let
      barPadding = 5,
      barColor = "#348AA7";
    let widthScale = d => d * 10;

    let width = widthScale(dataNode.value);
    let yMid = barHeight * 0.5;

    return (
      <g className={"bar-group"}>
        <text className={"name-label"} x={-6} y={yMid} alignmentBaseline={"middle"}>{dataNode.name}</text>
        <rect y={barPadding * 0.5} width={width} height={barHeight-barPadding} fill={barColor}/>
        <text className={"value-label"} x={width-8} y={yMid} alignmentBaseline={"middle"}>{dataNode.value}</text>
      </g>
    )
  };

  const barHeight = 30;
  let prevWeek = new Date();
  prevWeek.setDate(prevWeek.getDate() - (prevWeek.getDate() + 7) % 7);
  console.log("Previous Week Was: ", prevWeek);
  let parseWeekString = prevWeek.toString().split(" ");
  let parsedWeek = parseWeekString[0] + " " + parseWeekString[1] + " " + parseWeekString[2] + " " + parseWeekString[3]

  return (
    <>
      <svg width={"800"} height={"300"}>
        <g className={"chart-container"}>
          <text className={"title"} x={"10"} y={"30"}>Total Orders For Week Beginning {parsedWeek}
          </text>
          <g className={"chart"} transform={"translate(100, 60)"}>
            {chartData.map((dataNode, index) => (
              <g transform={`translate(0, ${index * barHeight})`}>
                {ConstructBarGroup(barHeight, dataNode)}
              </g>
            ))}
          </g>
        </g>
      </svg>
    </>
  );
};

export default TestChart;