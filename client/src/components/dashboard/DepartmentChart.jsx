import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
  ChartDataLabels,
);

function DepartmentChart({ departments }) {
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
        ],

        borderRadius: 10,

        borderSkipped: false,

        maxBarThickness: 55,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      title: {
        display: true,

        text: "Employees by Department",

        font: {
          size: 18,
          weight: "bold",
        },
      },

      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#212529",

        titleColor: "#fff",

        bodyColor: "#fff",

        padding: 12,
      },

      datalabels: {
        anchor: "end",

        align: "top",

        color: "#000",

        font: {
          weight: "bold",
          size: 13,
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          font: {
            weight: "bold",
          },
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          precision: 0,
        },

        grid: {
          color: "#e9ecef",
        },
      },
    },
  };

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-header bg-white">
        <h5 className="fw-bold mb-0 text-primary">
          <i className="bi bi-bar-chart-fill me-2"></i>
          Department Employees
        </h5>
      </div>

      <div className="card-body" style={{ height: "420px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default DepartmentChart;
