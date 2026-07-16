function DepartmentTable({ departments }) {
  return (
    <div className="card shadow border-0 mt-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Department Analytics</h5>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-light">
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
              {departments.map((dept) => (
                <tr key={dept.department}>
                  <td>{dept.department}</td>

                  <td>{dept.totalEmployees}</td>

                  <td>{dept.maleEmployees}</td>

                  <td>{dept.femaleEmployees}</td>

                  <td>{dept.otherEmployees}</td>

                  <td>{dept.averageAge}</td>

                  <td>₹ {dept.averageSalary}</td>

                  <td>₹ {dept.highestSalary}</td>

                  <td>₹ {dept.lowestSalary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DepartmentTable;
