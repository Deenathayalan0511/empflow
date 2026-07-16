import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

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

        hoverOffset: 35,

        cutout: "60%",
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

        color: "#212529",

        font: {
          size: 18,

          weight: "bold",
        },
      },

      legend: {
        position: "right",

        labels: {
          color: "#212529",

          font: {
            size: 13,

            weight: "bold",
          },

          usePointStyle: true,

          pointStyle: "circle",

          padding: 20,
        },
      },
    },
  };

  return (
    <div className="card shadow border-0 mt-4" style={{ height: "400px" }}>
      <div className="card-body">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}

export default DepartmentDistributionChart;
