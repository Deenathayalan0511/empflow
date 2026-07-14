import { useEffect, useState } from "react";

import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "./services/employeeService";

import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);

  const [editing, setEditing] = useState(null);

  const [search, setSearch] = useState("");
  const [column, setColumn] = useState("name");

  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");

  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("ASC");

  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const loadEmployees = async () => {
  setLoading(true);

  const res = await getEmployees({
    search,
    column,
    department,
    gender,
    sortBy,
    order,
    page,
    limit,
  });

  setEmployees(res.data.data);
  setCount(res.data.total);

  setLoading(false);
};

 useEffect(() => {
  loadEmployees();
}, [
  search,
  column,
  department,
  gender,
  sortBy,
  order,
  page,
]);

  const handleSubmit = async (employee) => {
    if (editing) {
      await updateEmployee(editing.id, employee);
      setEditing(null);
    } else {
      console.log("employee : ", employee);
      await createEmployee(employee);
    }

    loadEmployees();
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    loadEmployees();
  };

  return (
    <div className="container">
      <h1>Employee Management System</h1>

      <EmployeeForm onSubmit={handleSubmit} editing={editing} />

      <EmployeeList
        employees={employees}
        onDelete={handleDelete}
        onEdit={setEditing}
      />
    </div>
  );
}

export default App;
