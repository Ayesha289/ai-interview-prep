import React, { useState } from "react";
import {
  Chart,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { Flipper, Flipped } from "react-flip-toolkit";

// Register the necessary elements
Chart.register(
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

const ChartComponent = ({ data }) => {
  const [chartType, setChartType] = useState("pie");

  const pieData = {
    labels: data.labels,
    datasets: [
      {
        label: "Dataset",
        data: data.values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",  // Red
          "rgba(54, 162, 235, 0.2)",  // Blue
          "rgba(255, 206, 86, 0.2)",  // Yellow
          "rgba(75, 192, 192, 0.2)",  // Green
          "rgba(153, 102, 255, 0.2)", // Purple
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",  // Red
          "rgba(54, 162, 235, 1)",  // Blue
          "rgba(255, 206, 86, 1)",  // Yellow
          "rgba(75, 192, 192, 1)",  // Green
          "rgba(153, 102, 255, 1)", // Purple
        ],
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: data.labels,
    datasets: [
      {
        label: "Dataset",
        data: data.values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",  // Red
          "rgba(54, 162, 235, 0.2)",  // Blue
          "rgba(255, 206, 86, 0.2)",  // Yellow
          "rgba(75, 192, 192, 0.2)",  // Green
          "rgba(153, 102, 255, 0.2)", // Purple
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",  // Red
          "rgba(54, 162, 235, 1)",  // Blue
          "rgba(255, 206, 86, 1)",  // Yellow
          "rgba(75, 192, 192, 1)",  // Green
          "rgba(153, 102, 255, 1)", // Purple
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Flipper flipKey={chartType}>
      <Flipped flipId="chart">
        <div className="flex items-center justify-center h-72 w-full">
          {chartType === "pie" && (
            <Doughnut
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          )}
          {chartType === "bar" && (
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false, // Hides the dataset label
                  },
                },
              }}
            />
          )}
        </div>
      </Flipped>
      <div style={{ margin: "20px 0 20px 0", zIndex: 1000 }}>
        <button
          className="bg-transparent border-2 text-white mr-2 p-1 rounded-md"
          onClick={(event) => {
            event.stopPropagation();
            setChartType("pie");
          }}
        >
          &#8592;
        </button>
        <button
          className="bg-transparent border-2 text-white p-1 rounded-md"
          onClick={(event) => {
            event.stopPropagation();
            setChartType("bar");
          }}
        >
          &#8594;
        </button>
      </div>
    </Flipper>
  );
};

export default ChartComponent;
