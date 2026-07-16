import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function SalaryChart({ departments }) {
  const data = {
    labels: departments.map((d) => d.department),

    datasets: [
      {
        label: "Average Salary",

        data: departments.map((d) => d.averageSalary),

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

        borderColor: [
          "#146c43",
          "#198754",
          "#087990",
          "#520dc2",
          "#ca6510",
          "#ffca2c",
          "#b02a37",
          "#0a58ca",
        ],

        borderWidth: 2,

        borderRadius: 8,
      },
    ],
  };
  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top",

        labels: {
          color: "#212529",

          font: {
            size: 14,

            weight: "bold",
          },
        },
      },

      title: {
        display: true,

        text: "Department Employees",

        color: "#212529",

        font: {
          size: 18,

          weight: "bold",
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#212529",

          font: {
            size: 13,

            weight: "bold",
          },
        },
      },

      y: {
        ticks: {
          color: "#212529",

          font: {
            size: 13,

            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <div className="card shadow mt-4" style={{ height: "400px" }}>
      <div className="card-header">
        <h5>Average Salary by Department</h5>
      </div>

      <div className="card-body">
        <Bar data={data} options={options}/>
      </div>
    </div>
  );
}

export default SalaryChart;
