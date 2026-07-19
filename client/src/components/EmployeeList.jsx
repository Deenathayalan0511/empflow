import avatar from "../assets/avatar.png";
import { Link } from "react-router-dom";

import exportPDF from "../utils/exportPDF";
import exportExcel from "../utils/exportExcel";
import exportWord from "../utils/exportWord";
import printEmployees from "../utils/printEmployee";

function EmployeeList({ employees, setEditing, removeEmployee }) {
  return (
    <div className="card shadow-lg border-0 rounded-4">
      {/* Header */}

      <div className="card-header bg-primary text-white">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <h4 className="mb-0">
            <i className="bi bi-table me-2"></i>
            Employee List
          </h4>

          <span className="badge bg-light text-dark fs-6">
            {employees.length} Employees
          </span>
        </div>
      </div>

      {/* Export Buttons */}

      <div className="card-body border-bottom">
        <div className="d-flex flex-wrap gap-2">
          <button
            className="btn btn-danger"
            onClick={() => exportPDF(employees)}
          >
            <i className="bi bi-file-earmark-pdf-fill me-2"></i>
            PDF
          </button>

          <button
            className="btn btn-success"
            onClick={() => exportExcel(employees)}
          >
            <i className="bi bi-file-earmark-excel-fill me-2"></i>
            Excel
          </button>

          <button
            className="btn btn-primary"
            onClick={() => exportWord(employees)}
          >
            <i className="bi bi-file-earmark-word-fill me-2"></i>
            Word
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => printEmployees(employees)}
          >
            <i className="bi bi-printer-fill me-2"></i>
            Print
          </button>
        </div>
      </div>

      {/* Employee Table */}

      <div className="table-responsive">
        {employees.length === 0 ? (
          <div className="text-center p-5">
            <i className="bi bi-people display-1 text-secondary"></i>

            <h4 className="mt-3">No Employees Found</h4>

            <p className="text-muted">
              Add your first employee to get started.
            </p>
          </div>
        ) : (
          <table className="table table-hover table-striped align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>ID</th>

                <th>Photo</th>

                <th>Name</th>

                <th>Age</th>

                <th>Gender</th>

                <th>Email</th>

                <th>Department</th>

                <th>Salary</th>

                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <strong>{employee.id}</strong>
                  </td>

                  <td>
                    {employee.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${employee.image}`}
                        alt={employee.name}
                        width="60"
                        height="60"
                        className="rounded-circle border border-2 border-primary"
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={avatar}
                        alt="Avatar"
                        width="60"
                        height="60"
                        className="rounded-circle border"
                      />
                    )}
                  </td>

                  <td className="fw-semibold">{employee.name}</td>

                  <td>{employee.age}</td>

                  <td>
                    <span
                      className={`badge ${
                        employee.gender === "Male"
                          ? "bg-primary"
                          : employee.gender === "Female"
                            ? "bg-danger"
                            : "bg-secondary"
                      }`}
                    >
                      {employee.gender}
                    </span>
                  </td>

                  <td>{employee.email}</td>

                  <td>
                    <span className="badge bg-success">
                      {employee.department}
                    </span>
                  </td>

                  <td className="fw-bold text-success">
                    ₹ {Number(employee.salary).toLocaleString()}
                  </td>

                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Link
                        to={`/employee/${employee.id}`}
                        className="btn btn-primary btn-sm"
                        title="View"
                      >
                        <i className="bi bi-eye-fill"></i>
                      </Link>

                      <button
                        className="btn btn-warning btn-sm"
                        title="Edit"
                        onClick={() => setEditing(employee)}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        title="Delete"
                        onClick={() => removeEmployee(employee)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default EmployeeList;
