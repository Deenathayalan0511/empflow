import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartDataLabels
);

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

        backgroundColor: [
          "#0d6efd",
          "#e83e8c",
          "#6c757d",
        ],

        borderColor: "#ffffff",

        borderWidth: 3,

        hoverOffset: 15,

        cutout: "65%",
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      title: {
        display: true,

        text: "Gender Distribution",

        font: {
          size: 18,
          weight: "bold",
        },
      },

      legend: {
        position: "bottom",

        labels: {
          usePointStyle: true,

          pointStyle: "circle",

          padding: 20,

          font: {
            size: 13,
            weight: "bold",
          },
        },
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;

            const total = context.dataset.data.reduce(
              (a, b) => a + b,
              0
            );

            const percentage = (
              (value / total) *
              100
            ).toFixed(1);

            return `${context.label}: ${value} Employees (${percentage}%)`;
          },
        },
      },

      datalabels: {
        color: "#ffffff",

        font: {
          weight: "bold",
          size: 14,
        },

        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (a, b) => a + b,
            0
          );

          return (
            ((value / total) * 100).toFixed(1) + "%"
          );
        },
      },
    },
  };

  return (
    <div className="card shadow-sm border-0 h-100">

      <div className="card-header bg-white">
        <h5 className="fw-bold mb-0 text-primary">
          <i className="bi bi-pie-chart-fill me-2"></i>
          Gender Distribution
        </h5>
      </div>

      <div
        className="card-body"
        style={{ height: "420px" }}
      >
        <Doughnut
          data={data}
          options={options}
        />
      </div>

    </div>
  );
}

export default GenderChart;