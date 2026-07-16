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

function DepartmentChart({ departments }) {
  const data = {
    labels: departments.map((d) => d.department),

    datasets: [
      {
        label: "Employees",
        data: departments.map((d) => d.totalEmployees),

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

        borderColor: [
          "#0a58ca",
          "#146c43",
          "#b02a37",
          "#ffca2c",
          "#59359a",
          "#ca6510",
          "#198754",
          "#087990",
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
    <div className="card shadow mt-4 " style={{ height: "400px" }}>
      <div className="card-header">
        <h5>Department-wise Employees</h5>
      </div>

      <div className="card-body">
        <Bar data={data} options={options}/>
      </div>
    </div>
  );
}

export default DepartmentChart;
