import React from "react";
import gaussian from "gaussian";
import {
  VictoryLine,
  VictoryArea,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
} from "victory";
import range from "lodash/range";

export default function GaussChart({
  mean = 50,
  stdev = 20,
  score = 60,
  // barWidth = 1,
}) {
  return (
    <div>
      <VictoryChart
        domain={{
          x: [0, 100],
          y: [0, gaussian(mean, Math.pow(stdev, 2)).pdf(mean) + 0.001],
        }}
      >
        {/* <VictoryArea
          style={{
            data: {
              // fill: "#FFF4E3",
              fill: "#FFA819",
              fillOpacity: 0.3,
              strokeWidth: 1,
            },
          }}
          data={range(101)}
          y={(data) => gaussian(mean, Math.pow(stdev, 2)).pdf(data) + 0.001}
        /> */}
        <VictoryArea
          style={{
            data: { fill: "#FFA819", fillOpacity: 0.3, strokeWidth: 1 },
          }}
          data={range(score)}
          y={(data) => gaussian(mean, Math.pow(stdev, 2)).pdf(data) + 0.001}
        />
        {/* <VictoryLine
          style={{
            data: { stroke: "#2000FF", strokeWidth: barWidth },
            axis: {
              opacity: 0,
            },
            ticks: {
              opacity: 0,
            },
            tickLabels: {
              fontSize: 14,
              fill: "#2000FF",
              fontWeight: "400",
            },
            grid: {
              stroke: "#2000FF",
              strokeWidth: 1,
              strokeLinecap: "butt",
              opacity: 1,
              strokeDasharray: [0],
            },
          }}
          labels={({ datum }) =>
            datum.y === gaussian(mean, Math.pow(stdev, 2)).pdf(score)
              ? "Your score"
              : null
          }
          data={[
            { x: score, y: gaussian(mean, Math.pow(stdev, 2)).pdf(score) },
            { x: score, y: 0 },
          ]}
        /> */}
        {/* <VictoryLine
          style={{ data: { stroke: "#0A0029", strokeWidth: 1 } }}
          data={range(101)}
          y={(data) => {
            return gaussian(56, Math.pow(20, 2)).pdf(data);
          }}
        /> */}
        <VictoryLine
          style={{ data: { stroke: "#1a2217", strokeWidth: 1 } }}
          data={range(101)}
          y={(data) => gaussian(mean, Math.pow(stdev, 2)).pdf(data) + 0.001}
        />

        <VictoryAxis
          style={{
            axis: { stroke: "#1a2217" },
            ticks: { stroke: "grey", size: 3 },
            tickLabels: { fontSize: 12, padding: 10, fontWeight: "bold" },
          }}
          //   tickFormat={(x) => `${x}%`}
          //   tickValues={[0, 20, 40, 60, 80, 100]}
          tickFormat={["최저가", "평균가", "최고가"]}
          tickValues={[0, 50, 100]}
        />
        <VictoryAxis
          tickFormat={() => ""}
          tickLabelComponent={<VictoryLabel dy={-230} />}
          style={{
            axis: {
              opacity: 0,
            },
            ticks: {
              opacity: 0,
            },
            tickLabels: {
              fontSize: 14,
              fill: "#1a2217",
              fontWeight: "400",
            },
            grid: {
              stroke: "#1a2217",
              strokeWidth: 1,
              strokeLinecap: "butt",
              opacity: 1,
              strokeDasharray: [5],
            },
          }}
          tickValues={[50]}
        />
      </VictoryChart>
    </div>
  );
}
