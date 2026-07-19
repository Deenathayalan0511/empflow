import api from "./api";

const API = "/employees";

// ===============================
// Get All Employees
// ===============================
export const getEmployees = () => {
  return api.get(API);
};

// ===============================
// Get Employee By ID
// ===============================
export const getEmployeeById = (id) => {
  return api.get(`${API}/${id}`);
};

// ===============================
// Create Employee
// ===============================
export const createEmployee = (employee) => {
  const formData = new FormData();

  formData.append("name", employee.name);
  formData.append("age", employee.age);
  formData.append("gender", employee.gender);
  formData.append("email", employee.email);
  formData.append("department", employee.department);
  formData.append("salary", employee.salary);

  if (employee.image) {
    formData.append("image", employee.image);
  }

  return api.post(API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ===============================
// Update Employee
// ===============================
export const updateEmployee = (id, employee) => {
  const formData = new FormData();

  formData.append("name", employee.name);
  formData.append("age", employee.age);
  formData.append("gender", employee.gender);
  formData.append("email", employee.email);
  formData.append("department", employee.department);
  formData.append("salary", employee.salary);

  if (employee.image instanceof File) {
    formData.append("image", employee.image);
  } else if (employee.image) {
    formData.append("image", employee.image);
  }

  return api.put(`${API}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ===============================
// Delete Employee
// ===============================
export const deleteEmployee = (id) => {
  return api.delete(`${API}/${id}`);
};

// ===============================
// Filter Employees
// ===============================
export const filterEmployees = (
  search,
  column,
  department,
  gender,
  sortBy,
  order,
  page,
  limit,
) => {
  return api.get(`${API}/filter`, {
    params: {
      search,
      column,
      department,
      gender,
      sortBy,
      order,
      page,
      limit,
    },
  });
};
