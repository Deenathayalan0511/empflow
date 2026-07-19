import { useEffect, useState } from "react";

import api from "../services/api";
import StatCard from "../components/dashboard/StatCard";
import DepartmentTable from "../components/dashboard/DepartmentTable";
import DepartmentChart from "../components/dashboard/DepartmentChart";
import GenderChart from "../components/dashboard/GenderChart";
import SalaryChart from "../components/dashboard/SalaryChart";
import DepartmentDistributionChart from "../components/dashboard/DepartmentDistributionChart";

const getDashboard = async () => {
  return await api.get("/dashboard");
};



function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);

    try {
      const res = await getDashboard();

      setDashboard(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            style={{ width: "4rem", height: "4rem" }}
          ></div>

          <h5 className="mt-3">Loading Dashboard...</h5>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          <h4>{error}</h4>

          <button className="btn btn-primary mt-3" onClick={fetchDashboard}>
            <i className="bi bi-arrow-clockwise me-2"></i>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div>
          <h2 className="fw-bold text-primary">
            <i className="bi bi-bar-chart-line-fill me-2"></i>
             Analytics Dashboard
          </h2>

          <p className="text-muted mb-0">
            Real-time workforce insights and analytics
          </p>
        </div>

        <button className="btn btn-outline-primary" onClick={fetchDashboard}>
          <i className="bi bi-arrow-repeat me-2"></i>
          Refresh
        </button>
      </div>

      {/* Statistics */}

      <div className="row g-4">
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

      {/* Department Table */}

      <div className="mt-5">
        <DepartmentTable departments={dashboard.departments} />
      </div>

      {/* Charts */}

      <div className="row mt-4 g-4">
        <div className="col-lg-6">
          <DepartmentChart departments={dashboard.departments} />
        </div>

        <div className="col-lg-6">
          <GenderChart overall={dashboard.overall} />
        </div>
      </div>

      <div className="row mt-4 g-4">
        <div className="col-lg-6">
          <DepartmentDistributionChart departments={dashboard.departments} />
        </div>

        <div className="col-lg-6">
          <SalaryChart departments={dashboard.departments} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
