import { useEffect, useState } from "react";
import axios from "axios";

import StatCard from "../components/dashboard/StatCard";
import DepartmentTable from "../components/dashboard/DepartmentTable";
import DepartmentChart from "../components/dashboard/DepartmentChart";
import GenderChart from "../components/dashboard/GenderChart";
import SalaryChart from "../components/dashboard/SalaryChart";
import DepartmentDistributionChart from "../components/dashboard/DepartmentDistributionChart";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard");

      setDashboard(res.data);
    } catch (err) {
      setError("Failed to load dashboard.");

      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary"></div>

        <h5 className="mt-3">Loading Dashboard...</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">AI Workforce Analytics Dashboard</h2>

      <div className="row">
        <StatCard
          title="Total Employees"
          value={dashboard.overall.totalEmployees}
          icon="bi bi-people-fill"
          color="primary"
        />

        <StatCard
          title="Male Employees"
          value={dashboard.overall.maleEmployees}
          icon="bi bi-gender-male"
          color="info"
        />

        <StatCard
          title="Female Employees"
          value={dashboard.overall.femaleEmployees}
          icon="bi bi-gender-female"
          color="danger"
        />

        <StatCard
          title="Other Employees"
          value={dashboard.overall.otherEmployees}
          icon="bi bi-person-bounding-box"
          color="secondary"
        />

        <StatCard
          title="Average Age"
          value={dashboard.overall.averageAge}
          icon="bi bi-calendar-heart"
          color="success"
        />

        <StatCard
          title="Average Salary"
          value={`₹ ${dashboard.overall.averageSalary}`}
          icon="bi bi-cash-stack"
          color="warning"
        />

        <StatCard
          title="Highest Salary"
          value={`₹ ${dashboard.overall.highestSalary}`}
          icon="bi bi-graph-up-arrow"
          color="success"
        />

        <StatCard
          title="Lowest Salary"
          value={`₹ ${dashboard.overall.lowestSalary}`}
          icon="bi bi-graph-down-arrow"
          color="danger"
        />
      </div>
      <DepartmentTable departments={dashboard.departments} />
      <div className="row mt-4">
        <div className="col-lg-6 d-flex">
          <div className="card shadow w-100">
            <DepartmentChart departments={dashboard.departments} />
          </div>
        </div>

        <div className="col-lg-6 d-flex">
          <div className="card shadow w-100">
            <GenderChart overall={dashboard.overall} />
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-6 d-flex">
          <div className="card shadow w-100">
            <DepartmentDistributionChart departments={dashboard.departments} />
          </div>
        </div>

        <div className="col-lg-6 d-flex">
          <div className="card shadow w-100">
            <SalaryChart departments={dashboard.departments} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
