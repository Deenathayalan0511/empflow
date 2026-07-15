import { useState, useEffect } from "react";

function EmployeeForm({ initialState, addEmployee, editEmployee, editing }) {
  const [employee, setEmployee] = useState(initialState);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    department: "",
    salary: "",
  });
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (!/^[A-Za-z ]+$/.test(value)) {
          error = "Only alphabets are allowed";
        } else if (value.trim().length < 3) {
          error = "Name must be at least 3 characters";
        }

        break;

      case "age":
        if (!value) {
          error = "Age is required";
        } else if (value < 18 || value > 60) {
          error = "Age must be between 18 and 60";
        }

        break;

      case "gender":
        if (!value) {
          error = "Please select gender";
        }

        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          error = "Invalid email address";
        }

        break;

      case "department":
        if (!value) {
          error = "Please select department";
        }

        break;

      case "salary":
        if (!value) {
          error = "Salary is required";
        } else if (value < 10000) {
          error = "Salary must be at least ₹10,000";
        }

        break;

      default:
        break;
    }

    return error;
  };

  useEffect(() => {
    if (editing) {
      setEmployee(editing);

      if (editing.image) {
        setPreview(`http://localhost:5000/uploads/${editing.image}`);
      } else {
        setPreview("");
      }
    } else {
      setEmployee(initialState);

      setPreview("");
    }
  }, [editing, initialState]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];

      setEmployee({
        ...employee,
        image: file,
      });

      if (file) {
        setPreview(URL.createObjectURL(file));
      }

      return;
    }

    setEmployee({
      ...employee,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  const validateForm = () => {
    let newErrors = {};

    Object.keys(employee).forEach((key) => {
      newErrors[key] = validateField(key, employee[key]);
    });

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (editing) {
      editEmployee(employee);
    } else {
      addEmployee(employee);
    }

    setEmployee(initialState);

    setPreview("");

    setErrors({
      name: "",
      age: "",
      gender: "",
      email: "",
      department: "",
      salary: "",
    });
  };

  return (
    <div className="card shadow">
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">{editing ? "Update Employee" : "Add Employee"}</h4>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>

            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              name="name"
              value={employee.name}
              onChange={handleChange}
            />

            <div className="invalid-feedback">{errors.name}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>

            <input
              type="number"
              className={`form-control ${errors.age ? "is-invalid" : ""}`}
              name="age"
              value={employee.age}
              onChange={handleChange}
            />

            <div className="invalid-feedback">{errors.age}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>

            <select
              className={`form-select ${errors.gender ? "is-invalid" : ""}`}
              name="gender"
              value={employee.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <div className="invalid-feedback">{errors.gender}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              name="email"
              value={employee.email}
              onChange={handleChange}
            />

            <div className="invalid-feedback">{errors.email}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Department</label>

            <select
              className={`form-select ${errors.department ? "is-invalid" : ""}`}
              name="department"
              value={employee.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option>IT</option>
              <option>HR</option>
              <option>Finance</option>
              <option>Marketing</option>
              <option>Sales</option>
              <option>Support</option>
            </select>

            <div className="invalid-feedback">{errors.department}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Salary</label>

            <input
              type="number"
              className={`form-control ${errors.salary ? "is-invalid" : ""}`}
              name="salary"
              value={employee.salary}
              onChange={handleChange}
            />

            <div className="invalid-feedback">{errors.salary}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Employee Image</label>

            <input
              type="file"
              name="image"
              accept="image/*"
              className="form-control"
              onChange={handleChange}
            />

            {preview && (
              <div className="text-center mt-3">
                <img
                  src={preview}
                  alt="Preview"
                  width="120"
                  height="120"
                  className="rounded-circle border"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>

          <button
            className={
              editing ? "btn btn-warning w-100" : "btn btn-success w-100"
            }
          >
            {editing ? "Update Employee" : "Add Employee"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
