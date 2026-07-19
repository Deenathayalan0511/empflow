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
  ChartDataLabels
);

function SalaryChart({ departments }) {
  const data = {
    labels: departments.map((dept) => dept.department),

    datasets: [
      {
        label: "Average Salary",

        data: departments.map((dept) => dept.averageSalary),

        backgroundColor: [
          "#198754",
          "#20c997",
          "#0dcaf0",
          "#6610f2",
          "#fd7e14",
          "#ffc107",
          "#dc3545",
          "#0d6efd",
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

        text: "Average Salary by Department",

        font: {
          size: 18,
          weight: "bold",
        },
      },

      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            return `₹ ${Number(context.raw).toLocaleString()}`;
          },
        },
      },

      datalabels: {
        anchor: "end",

        align: "top",

        color: "#212529",

        font: {
          weight: "bold",
          size: 12,
        },

        formatter: (value) =>
          "₹" + Number(value).toLocaleString(),
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
          callback: function (value) {
            return "₹" + Number(value).toLocaleString();
          },
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
        <h5 className="fw-bold mb-0 text-success">
          <i className="bi bi-cash-stack me-2"></i>
          Average Salary by Department
        </h5>
      </div>

      <div
        className="card-body"
        style={{ height: "420px" }}
      >
        <Bar
          data={data}
          options={options}
        />
      </div>

    </div>
  );
}

export default SalaryChart;