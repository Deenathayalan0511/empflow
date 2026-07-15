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
      <h2 className="text-center mb-4">Employee Search & Filter</h2>

      <div className="card shadow p-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Search</label>

            <input
              type="text"
              className="form-control"
              placeholder="Search..."
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
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
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
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

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

      <div className="card mt-4 shadow">
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
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
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.age}</td>
                  <td>{emp.gender}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>{emp.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FilterPage;
