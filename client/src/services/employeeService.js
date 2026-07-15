import axios from "axios";

const API = "http://localhost:5000/api/employees";

// Get Employees
export const getEmployees = () => {
    return axios.get(API);
};

// Create Employee
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

    return axios.post(API, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

// Update Employee
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
    } else {
        formData.append("image", employee.image || "");
    }

    return axios.put(`${API}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

// Delete Employee
export const deleteEmployee = (id) => {
    return axios.delete(`${API}/${id}`);
};

// Filter Employees
export const filterEmployees = (
    search,
    column,
    department,
    gender,
    sortBy,
    order,
    page,
    limit
) => {

    return axios.get(`${API}/filter`, {
        params: {
            search,
            column,
            department,
            gender,
            sortBy,
            order,
            page,
            limit
        }
    });

};