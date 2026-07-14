import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

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
  };

  const [employees, setEmployees] = useState([]);

  const [editing, setEditing] = useState(null);

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

  const addEmployee = async (employee) => {
    try {
      await createEmployee(employee);

      toast.success("Employee Added Successfully");

      loadEmployees();
    } catch (error) {
      toast.error("Unable to Add Employee");
    }
  };

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

  const removeEmployee = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmDelete) return;

    try {
      await deleteEmployee(id);

      toast.success("Employee Deleted Successfully");

      loadEmployees();
    } catch (error) {
      toast.error("Unable to Delete Employee");
    }
  };

  return (
    <div className="container-fluit mt-5">
      <div className="">
        <div className="w-50 mx-auto">
          <EmployeeForm
            initialState={initialState}
            addEmployee={addEmployee}
            editEmployee={editEmployee}
            editing={editing}
          />
        </div>

        <div className="">
          <EmployeeList
            employees={employees}
            setEditing={setEditing}
            removeEmployee={removeEmployee}
          />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default WorkingPage;
