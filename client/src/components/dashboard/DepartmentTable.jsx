function DepartmentTable({ departments }) {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white py-3">
        <h4 className="mb-0 fw-bold text-primary">
          <i className="bi bi-building me-2"></i>
          Department Analytics
        </h4>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-primary text-center">
              <tr>
                <th>Department</th>
                <th>Total</th>
                <th>Male</th>
                <th>Female</th>
                <th>Other</th>
                <th>Avg Age</th>
                <th>Avg Salary</th>
                <th>Highest Salary</th>
                <th>Lowest Salary</th>
              </tr>
            </thead>

            <tbody>
              {departments.length > 0 ? (
                departments.map((dept) => (
                  <tr key={dept.department}>
                    <td>
                      <span className="badge bg-primary fs-6 px-3 py-2">
                        {dept.department}
                      </span>
                    </td>

                    <td className="text-center fw-bold">
                      {dept.totalEmployees}
                    </td>

                    <td className="text-center text-primary fw-semibold">
                      {dept.maleEmployees}
                    </td>

                    <td className="text-center text-danger fw-semibold">
                      {dept.femaleEmployees}
                    </td>

                    <td className="text-center text-secondary fw-semibold">
                      {dept.otherEmployees}
                    </td>

                    <td className="text-center">{dept.averageAge} Years</td>

                    <td className="text-end text-success fw-bold">
                      ₹ {Number(dept.averageSalary).toLocaleString()}
                    </td>

                    <td className="text-end text-success fw-bold">
                      ₹ {Number(dept.highestSalary).toLocaleString()}
                    </td>

                    <td className="text-end text-danger fw-bold">
                      ₹ {Number(dept.lowestSalary).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center text-muted py-4">
                    No Department Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DepartmentTable;
