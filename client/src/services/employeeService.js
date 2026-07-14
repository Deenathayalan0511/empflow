import axios from "axios";

const API = "http://localhost:5000/employees";

export const getEmployees = () => axios.get(API);

export const createEmployee = (employee) =>
    axios.post(API, employee);

export const updateEmployee = (id, employee) =>
    axios.put(`${API}/${id}`, employee);

export const deleteEmployee = (id) =>
    axios.delete(`${API}/${id}`);

export const searchEmployee = (column, value) => {
  return axios.get(`${API}/search`, {
    params: {
      column,
      value,
    },
  });
};