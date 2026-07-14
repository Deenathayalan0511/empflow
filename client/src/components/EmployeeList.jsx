function EmployeeList({
    employees,
    setEditing,
    removeEmployee
}) {

    return (

        <div className="card shadow">

            <div className="card-header bg-dark text-white">

                <h4 className="mb-0">
                    Employee List
                </h4>

            </div>

            <div className="card-body">

                {
                    employees.length === 0 ? (

                        <div className="alert alert-warning text-center">

                            No Employees Found

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-bordered table-hover align-middle">

                                <thead className="table-primary">

                                    <tr>

                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Gender</th>
                                        <th>Email</th>
                                        <th>Department</th>
                                        <th>Salary</th>
                                        <th width="180">
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        employees.map((employee) => (

                                            <tr key={employee.id}>

                                                <td>{employee.id}</td>

                                                <td>{employee.name}</td>

                                                <td>{employee.age}</td>

                                                <td>

                                                    <span className="badge bg-info">

                                                        {employee.gender}

                                                    </span>

                                                </td>

                                                <td>{employee.email}</td>

                                                <td>

                                                    <span className="badge bg-success">

                                                        {employee.department}

                                                    </span>

                                                </td>

                                                <td>

                                                    ₹ {Number(employee.salary).toLocaleString()}

                                                </td>

                                                <td>

                                                    <button
                                                        className="btn btn-warning btn-sm me-2"
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

                                        ))

                                    }

                                </tbody>

                            </table>

                        </div>

                    )

                }

            </div>

        </div>

    );

}

export default EmployeeList;