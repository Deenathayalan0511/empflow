import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

import "../App.css";

function WorkingPage() {
  const initialState = {
    name: "",
    age: "",
    gender: "",
    email: "",
    department: "",
    salary: "",
    image: null,
  };

  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const loadEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Add Employee
  const addEmployee = async (employee) => {
    try {
      await createEmployee(employee);
      toast.success("Employee Added Successfully");
      loadEmployees();
    } catch (error) {
      toast.error("Unable to Add Employee");
    }
  };

  // Update Employee
  const editEmployee = async (employee) => {
    try {
      await updateEmployee(employee.id, employee);
      toast.success("Employee Updated Successfully");
      setEditing(null);
      loadEmployees();
    } catch (error) {
      toast.error("Unable to Update Employee");
    }
  };

  // Delete Employee
  const removeEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteEmployee(selectedEmployee.id);

      toast.success("Employee Deleted Successfully");

      setShowDeleteModal(false);
      setSelectedEmployee(null);

      loadEmployees();
    } catch (error) {
      toast.error("Unable to Delete Employee");
    }
  };
  const totalEmployees = employees.length;

  const maleEmployees = employees.filter((emp) => emp.gender === "Male").length;

  const femaleEmployees = employees.filter(
    (emp) => emp.gender === "Female",
  ).length;

  const totalDepartments = new Set(employees.map((emp) => emp.department)).size;

  return (
    <div className="container-fluid py-4">
      {/* Page Header */}

      <div className="mb-4">
        <h2 className="fw-bold text-primary">
          <i className="bi bi-people-fill me-2"></i>
          Employee Management
        </h2>

        <p className="text-muted">
          Add, edit, update and manage employee information.
        </p>
      </div>

      {/* Statistics */}

      <div className="row g-4 mb-4">
        <div className="col-lg-3 col-md-6">
          <div className="card shadow border-0 h-100">
            <div className="card-body text-center">
              <i className="bi bi-people-fill display-5 text-primary"></i>

              <h6 className="mt-3 text-muted">Total Employees</h6>

              <h2 className="fw-bold">{totalEmployees}</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card shadow border-0 h-100">
            <div className="card-body text-center">
              <i className="bi bi-gender-male display-5 text-info"></i>

              <h6 className="mt-3 text-muted">Male Employees</h6>

              <h2 className="fw-bold">{maleEmployees}</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card shadow border-0 h-100">
            <div className="card-body text-center">
              <i className="bi bi-gender-female display-5 text-danger"></i>

              <h6 className="mt-3 text-muted">Female Employees</h6>

              <h2 className="fw-bold">{femaleEmployees}</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card shadow border-0 h-100">
            <div className="card-body text-center">
              <i className="bi bi-building display-5 text-success"></i>

              <h6 className="mt-3 text-muted">Departments</h6>

              <h2 className="fw-bold">{totalDepartments}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Form + Employee List */}

      <div className="row">
        {/* Employee Form */}

        <div className="col-lg-4 mb-4">
          <EmployeeForm
            initialState={initialState}
            addEmployee={addEmployee}
            editEmployee={editEmployee}
            editing={editing}
          />
        </div>

        {/* Employee List */}

        <div className="col-lg-8">
          <EmployeeList
            employees={employees}
            setEditing={setEditing}
            removeEmployee={removeEmployee}
          />
        </div>
      </div>
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>
            Confirm Delete
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="mb-2">
            Are you sure you want to delete
            <strong> {selectedEmployee?.name}</strong>?
          </p>

          <div className="alert alert-warning mb-0">
            <i className="bi bi-info-circle-fill me-2"></i>
            This action cannot be undone.
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>

          <Button variant="danger" onClick={confirmDelete}>
            <i className="bi bi-trash me-1"></i>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default WorkingPage;
