import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

import avatar from "../assets/avatar.png";
import { getEmployeeById } from "../services/employeeService";

function EmployeeDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    try {
      const res = await getEmployeeById(id);

      setEmployee(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!employee) {
    return (
      <div className="container mt-5">
        <h3 className="text-center">Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-dark text-white text-center">
              <h3 className="mb-0">Employee Profile</h3>
            </div>

            <div className="card-body">
              <div className="text-center mb-4">
                {employee.image ? (
                  <img
                    src={`http://localhost:5000/uploads/${employee.image}`}
                    alt={employee.name}
                    width="160"
                    height="160"
                    className="rounded-circle border border-4 border-primary"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <img
                    src={avatar}
                    alt={employee.name}
                    width="160"
                    height="160"
                    className="rounded-circle border border-4 border-primary"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                )}

                <h2 className="mt-3"><i className="bi bi-person-fill text-primary me-2"></i>{employee.name}</h2>

                <span className="badge bg-primary fs-6">
                  {employee.department}
                </span>
              </div>

              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th width="180"> <i className="bi bi-envelope-fill text-warning me-2"></i>Email</th>

                    <td>{employee.email}</td>
                  </tr>

                  <tr>
                    <th>    <i className="bi bi-cake-fill text-danger me-2"></i>Age</th>

                    <td>{employee.age}</td>
                  </tr>

                  <tr>
                    <th><i className="bi bi-gender-ambiguous text-info me-2"></i> Gender</th>

                    <td>
                      <span className="badge bg-info">{employee.gender}</span>
                    </td>
                  </tr>

                  <tr>
                    <th> <i className="bi bi-building-fill text-success me-2"></i> Department</th>

                    <td>
                      <span className="badge bg-success">
                        {employee.department}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <th><i className="bi bi-cash-stack text-success me-2"></i> Salary</th>

                    <td>₹ {Number(employee.salary).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>

              <div className="text-center mt-4">
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate(-1)}
                >
                  ← Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
