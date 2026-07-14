import { useEffect, useState } from "react";

const initialState = {
  name: "",
  email: "",
  salary: "",
  gender: "",
  department: "",
};

function EmployeeForm({ onSubmit, editing }) {
  const [employee, setEmployee] = useState(initialState);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editing) {
      setEmployee(editing);
    } else {
      setEmployee(initialState);
    }

    setErrors({});
  }, [editing]);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });

    // Remove error when user starts typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // Validation Function
  const validate = () => {
    let newErrors = {};

    // Name
    if (!employee.name.trim()) {
      newErrors.name = "Name is required";
    } else if (employee.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Email
    if (!employee.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(employee.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    // Password
    if (!employee.salary) {
      newErrors.salary = "salary is required";
    } else if (employee.salary < 10000) {
      newErrors.salary = "salary enter above 10000";
    }

    // Gender
    if (!employee.gender) {
      newErrors.gender = "Please select gender";
    }

    // Department
    if (!employee.department.trim()) {
      newErrors.department = "Department is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();

  console.log("Submit function called");

    if (!validate()) {
      return;
    }

    onSubmit(employee);
setEmployee({
  ...initialState,
  ...editing,
});
    setErrors({});
  };

  return (
    <form onSubmit={submit}>

      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={employee.name}
        onChange={handleChange}
      />
      <span className="error">{errors.name}</span>

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={employee.email}
        onChange={handleChange}
      />
      <span className="error">{errors.email}</span>

      <input
        type="number"
        name="salary"
        placeholder="Enter salary"
        value={employee.salary}
        onChange={handleChange}
      />
      <span className="error">{errors.salary}</span>

      <select
        name="gender"
        value={employee.gender}
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <span className="error">{errors.gender}</span>

      <input
        type="text"
        name="department"
        placeholder="Department"
        value={employee.department}
        onChange={handleChange}
      />
      <span className="error">{errors.department}</span>

      <button type="submit">
        {editing ? "Update Employee" : "Add Employee"}
      </button>
      <div className="search-box">

    <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
    />

    <select
        value={column}
        onChange={(e)=>setColumn(e.target.value)}
    >

        <option value="name">Name</option>

        <option value="email">Email</option>

        <option value="department">Department</option>

    </select>

</div>

    </form>
  );
}

export default EmployeeForm;