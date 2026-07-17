import avatar from "../assets/avatar.png";
import { Link } from "react-router-dom";

import exportPDF from "../utils/exportPDF";
import exportExcel from "../utils/exportExcel";
import exportWord from "../utils/exportWord";
import printEmployees from "../utils/printEmployee";

function EmployeeList({ employees, setEditing, removeEmployee }) {
  return (
    <div className="card shadow">
      <div className="mb-3 d-flex flex-wrap gap-2 justify-content-around mt-3">
        <button className="btn btn-danger" onClick={() => exportPDF(employees)}>
          <i className="bi bi-file-earmark-pdf-fill"></i> PDF
        </button>

        <button
          className="btn btn-success"
          onClick={() => exportExcel(employees)}
        >
          <i className="bi bi-file-earmark-excel-fill"></i> Excel
        </button>

        <button
          className="btn btn-primary"
          onClick={() => exportWord(employees)}
        >
          <i className="bi bi-file-earmark-word-fill"></i> Word
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => printEmployees(employees)}
        >
          <i className="bi bi-printer-fill"></i> Print
        </button>
      </div>
      <div className="card-header bg-dark text-white">
        <h4 className="mb-0">Employee List</h4>
      </div>

      <div className="card-body">
        {employees.length === 0 ? (
          <div className="alert alert-warning text-center">
            No Employees Found
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Salary</th>
                  <th width="180">Action</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>

                    <td>
                      {employee.image ? (
                        <img
                          src={`http://localhost:5000/uploads/${employee.image}`}
                          alt={employee.name}
                          width="60"
                          height="60"
                          className="rounded-circle border"
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <img
                          src={avatar}
                          alt="No Image"
                          width="60"
                          height="60"
                          className="rounded-circle border"
                        />
                      )}
                    </td>

                    <td>{employee.name}</td>

                    <td>{employee.age}</td>

                    <td>
                      <span className="badge bg-info">{employee.gender}</span>
                    </td>

                    <td>{employee.email}</td>

                    <td>
                      <span className="badge bg-success">
                        {employee.department}
                      </span>
                    </td>

                    <td>₹ {Number(employee.salary).toLocaleString()}</td>

                    <td>
                      <Link
                        to={`/employee/${employee.id}`}
                        className="btn btn-primary btn-sm me-2 mb-1"
                      >
                        View
                      </Link>

                      <button
                        className="btn btn-warning btn-sm me-2 mb-1"
                        onClick={() => setEditing(employee)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeEmployee(employee.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeList;
