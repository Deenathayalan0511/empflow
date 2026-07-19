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
  <div className="card shadow-lg border-0 rounded-4">

    <div className="card-header bg-primary text-white rounded-top-4">
      <h4 className="mb-0">
        <i
          className={`bi ${
            editing
              ? "bi-pencil-square"
              : "bi-person-plus-fill"
          } me-2`}
        ></i>

        {editing ? "Update Employee" : "Add Employee"}
      </h4>
    </div>

    <div className="card-body">

      <form onSubmit={handleSubmit}>

        {/* Name */}

        <div className="mb-3">
          <label className="form-label fw-semibold">
            <i className="bi bi-person-fill me-2 text-primary"></i>
            Name
          </label>

          <input
            type="text"
            className={`form-control rounded-3 ${
              errors.name ? "is-invalid" : ""
            }`}
            name="name"
            value={employee.name}
            onChange={handleChange}
          />

          <div className="invalid-feedback">
            {errors.name}
          </div>
        </div>

        {/* Age */}

        <div className="mb-3">
          <label className="form-label fw-semibold">
            <i className="bi bi-calendar-event-fill me-2 text-success"></i>
            Age
          </label>

          <input
            type="number"
            className={`form-control rounded-3 ${
              errors.age ? "is-invalid" : ""
            }`}
            name="age"
            value={employee.age}
            onChange={handleChange}
          />

          <div className="invalid-feedback">
            {errors.age}
          </div>
        </div>

        {/* Gender */}

        <div className="mb-3">
          <label className="form-label fw-semibold">
            <i className="bi bi-gender-ambiguous me-2 text-info"></i>
            Gender
          </label>

          <select
            className={`form-select rounded-3 ${
              errors.gender ? "is-invalid" : ""
            }`}
            name="gender"
            value={employee.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <div className="invalid-feedback">
            {errors.gender}
          </div>
        </div>

        {/* Email */}

        <div className="mb-3">
          <label className="form-label fw-semibold">
            <i className="bi bi-envelope-fill me-2 text-danger"></i>
            Email
          </label>

          <input
            type="email"
            className={`form-control rounded-3 ${
              errors.email ? "is-invalid" : ""
            }`}
            name="email"
            value={employee.email}
            onChange={handleChange}
          />

          <div className="invalid-feedback">
            {errors.email}
          </div>
        </div>

        {/* Department */}

        <div className="mb-3">
          <label className="form-label fw-semibold">
            <i className="bi bi-building-fill me-2 text-warning"></i>
            Department
          </label>

          <select
            className={`form-select rounded-3 ${
              errors.department ? "is-invalid" : ""
            }`}
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

          <div className="invalid-feedback">
            {errors.department}
          </div>
        </div>

        {/* Salary */}

        <div className="mb-3">
          <label className="form-label fw-semibold">
            <i className="bi bi-cash-stack me-2 text-success"></i>
            Salary
          </label>

          <input
            type="number"
            className={`form-control rounded-3 ${
              errors.salary ? "is-invalid" : ""
            }`}
            name="salary"
            value={employee.salary}
            onChange={handleChange}
          />

          <div className="invalid-feedback">
            {errors.salary}
          </div>
        </div>

        {/* Image */}

        <div className="mb-3">
          <label className="form-label fw-semibold">
            <i className="bi bi-image-fill me-2 text-primary"></i>
            Employee Image
          </label>

          <input
            type="file"
            className="form-control"
            accept="image/*"
            name="image"
            onChange={handleChange}
          />
        </div>

        {preview && (
          <div className="text-center mb-3">

            <img
              src={preview}
              alt="Preview"
              width="130"
              height="130"
              className="rounded-circle shadow border border-3 border-primary"
              style={{
                objectFit: "cover",
              }}
            />

          </div>
        )}

        <div className="d-grid gap-2">

          <button
            className={
              editing
                ? "btn btn-warning btn-lg"
                : "btn btn-success btn-lg"
            }
          >
            <i
              className={`bi ${
                editing
                  ? "bi-pencil-square"
                  : "bi-person-plus-fill"
              } me-2`}
            ></i>

            {editing
              ? "Update Employee"
              : "Add Employee"}
          </button>

          {editing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => window.location.reload()}
            >
              Cancel
            </button>
          )}

        </div>

      </form>

    </div>

  </div>
);
}

export default EmployeeForm;
