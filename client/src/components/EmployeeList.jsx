function EmployeeList({
  employees,
  onDelete,
  onEdit,
}) {
  return (
    <table>

      <thead>

        <tr>

          <th>ID</th>

          <th>Name</th>

          <th>Email</th>

          <th>Gender</th>

          <th>salary</th>

          <th>Department</th>

          <th>Action</th>

        </tr>

      </thead>

      <tbody>

        {employees.map((emp) => (

          <tr key={emp.id}>

            <td>{emp.id}</td>

            <td>{emp.name}</td>

            <td>{emp.email}</td>

            <td>{emp.salary}</td>

            <td>{emp.gender}</td>

            <td>{emp.department}</td>

            <td>

              <button
                onClick={() => onEdit(emp)}
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(emp.id)}
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default EmployeeList;