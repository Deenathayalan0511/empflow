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

function DepartmentDistributionChart({ departments }) {
  const data = {
    labels: departments.map((dept) => dept.department),

    datasets: [
      {
        label: "Employees",

        data: departments.map((dept) => dept.totalEmployees),

        backgroundColor: [
          "#0d6efd",
          "#198754",
          "#dc3545",
          "#ffc107",
          "#6f42c1",
          "#fd7e14",
          "#20c997",
          "#0dcaf0",
          "#6610f2",
          "#d63384",
        ],

        borderColor: "#ffffff",

        borderWidth: 3,

        hoverOffset: 20,

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

        text: "Employee Distribution by Department",

        font: {
          size: 18,
          weight: "bold",
        },
      },

      legend: {
        position: "right",

        labels: {
          usePointStyle: true,

          pointStyle: "circle",

          padding: 18,

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
        color: "#fff",

        font: {
          weight: "bold",
          size: 13,
        },

        formatter: (value, context) => {
          const total =
            context.chart.data.datasets[0].data.reduce(
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
          Department Distribution
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

export default DepartmentDistributionChart;