import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

function GenderChart({ overall }) {
  const data = {
    labels: ["Male", "Female", "Other"],

    datasets: [
      {
        data: [
          overall.maleEmployees,
          overall.femaleEmployees,
          overall.otherEmployees,
        ],

        backgroundColor: ["#0d6efd", "#e83e8c", "#6c757d"],

        borderColor: "#ffffff",

        borderWidth: 3,

        hoverOffset: 35,

        cutout: "65%",
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: "#212529",

        font: {
          weight: "bold",

          size: 14,
        },

        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (a, b) => a + b,
            0,
          );

          return ((value / total) * 100).toFixed(1) + "%";
        },
      },
    },

    plugins: {
      title: {
        display: true,

        text: "Gender Distribution",

        color: "#212529",

        font: {
          size: 20,
          weight: "bold",
        },
      },

      legend: {
        position: "bottom",

        labels: {
          color: "#212529",

          font: {
            size: 14,
            weight: "bold",
          },

          padding: 20,

          usePointStyle: true,

          pointStyle: "circle",
        },
      },
    },
  };

  return (
    <div style={{ height: "400px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default GenderChart;
