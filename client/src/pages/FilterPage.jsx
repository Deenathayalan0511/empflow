import { useEffect, useState } from "react";
import { filterEmployees } from "../services/employeeService";

function FilterPage() {
  const [search, setSearch] = useState("");
  const [column, setColumn] = useState("name");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("DESC");

  const [employees, setEmployees] = useState([]);

  const [page, setPage] = useState(1);
  const limit = 5;
  const [totalPages, setTotalPages] = useState(1);

  const loadEmployees = async () => {
    try {
      const res = await filterEmployees(
        search,
        column,
        department,
        gender,
        sortBy,
        order,
        page,
        limit,
      );

      setEmployees(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [search, column, department, gender, sortBy, order, page]);

  return (
    <div className="container mt-4">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-primary">
            <i className="bi bi-funnel-fill me-2"></i>
            Employee Search & Filter
          </h2>

          <p className="text-muted">
            Search, filter and sort employees instantly.
          </p>
        </div>

        <span className="badge bg-primary fs-6 px-3 py-2">
          {employees.length} Employees
        </span>
      </div>

      {/* Statistics */}

      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <i className="bi bi-people-fill display-5 text-primary"></i>

              <h6 className="mt-3">Results</h6>

              <h3>{employees.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <i className="bi bi-gender-male display-5 text-info"></i>

              <h6 className="mt-3">Male</h6>

              <h3>{employees.filter((emp) => emp.gender === "Male").length}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <i className="bi bi-gender-female display-5 text-danger"></i>

              <h6 className="mt-3">Female</h6>

              <h3>
                {employees.filter((emp) => emp.gender === "Female").length}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <i className="bi bi-building display-5 text-success"></i>

              <h6 className="mt-3">Departments</h6>

              <h3>{new Set(employees.map((emp) => emp.department)).size}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Card */}

      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            <i className="bi bi-sliders me-2"></i>
            Filter Options
          </h4>
        </div>

        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Search</label>

              <input
                type="text"
                className="form-control"
                placeholder="Search employee..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Search Column</label>

              <select
                className="form-select"
                value={column}
                onChange={(e) => setColumn(e.target.value)}
              >
                <option value="name">Name</option>

                <option value="email">Email</option>

                <option value="department">Department</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Department</label>

              <select
                className="form-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">All</option>
                <option>IT</option>
                <option>HR</option>
                <option>Finance</option>
                <option>Marketing</option>
                <option>Sales</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Gender</label>

              <select
                className="form-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">All</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            {/* Sort By */}

            <div className="col-md-6">
              <label className="form-label">Sort By</label>

              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="id">ID</option>
                <option value="name">Name</option>
                <option value="salary">Salary</option>
                <option value="age">Age</option>
              </select>
            </div>

            {/* Order */}

            <div className="col-md-6">
              <label className="form-label">Order</label>

              <select
                className="form-select"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              >
                <option value="DESC">Descending</option>
                <option value="ASC">Ascending</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Table */}

      <div className="card mt-4 shadow-lg border-0">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">
            <i className="bi bi-table me-2"></i>
            Employee List
          </h4>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>ID</th>

                  <th>Name</th>

                  <th>Age</th>

                  <th>Gender</th>

                  <th>Email</th>

                  <th>Department</th>

                  <th>Salary</th>
                </tr>
              </thead>

              <tbody>
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <i className="bi bi-search display-4 text-secondary"></i>

                      <h5 className="mt-3">No Employees Found</h5>
                    </td>
                  </tr>
                ) : (
                  employees.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.id}</td>

                      <td className="fw-semibold">{emp.name}</td>

                      <td>{emp.age}</td>

                      <td>
                        <span
                          className={`badge ${
                            emp.gender === "Male" ? "bg-primary" : "bg-danger"
                          }`}
                        >
                          {emp.gender}
                        </span>
                      </td>

                      <td>{emp.email}</td>

                      <td>
                        <span className="badge bg-success">
                          {emp.department}
                        </span>
                      </td>

                      <td className="fw-bold text-success">
                        ₹ {Number(emp.salary).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}

          <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
            <button
              className="btn btn-outline-primary"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Previous
            </button>

            <span className="fw-bold">
              Page {page} of {totalPages}
            </span>

            <button
              className="btn btn-outline-primary"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
              <i className="bi bi-arrow-right ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterPage;
