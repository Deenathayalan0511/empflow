import {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getFilteredEmployees,
} from "../models/employeeModel.js";

// =========================================
// GET ALL EMPLOYEES
// =========================================
export const fetchEmployees = async (req, res) => { 
  try {
    const employees = await getEmployees(req.user.userId);

    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// GET EMPLOYEE BY ID
// =========================================
export const fetchEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await getEmployeeById(id, req.user.userId);

    if (employee.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: employee[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// FILTER EMPLOYEES
// =========================================
export const filterEmployees = async (req, res) => {
  try {
    const {
      search = "",
      column = "name",
      department = "",
      gender = "",
      sortBy = "id",
      order = "DESC",
      page = 1,
      limit = 5,
    } = req.query;

    const result = await getFilteredEmployees(
      req.user.userId,
      search,
      column,
      department,
      gender,
      sortBy,
      order,
      Number(page),
      Number(limit),
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// ADD EMPLOYEE
// =========================================
export const createEmployee = async (req, res) => {
  try {
    const employee = {
      ...req.body,
      image: req.file ? req.file.filename : null,
      user_id: req.user.userId,
    };

    await addEmployee(employee);

    res.status(201).json({
      success: true,
      message: "Employee Added Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// UPDATE EMPLOYEE
// =========================================
export const editEmployee = async (req, res) => {
  try {
    const employee = {
      ...req.body,
      image: req.file ? req.file.filename : req.body.image,
    };

    const result = await updateEmployee(
      req.params.id,
      req.user.userId,
      employee,
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee Not Found or Unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// DELETE EMPLOYEE
// =========================================
export const removeEmployee = async (req, res) => {
  try {
    const result = await deleteEmployee(req.params.id, req.user.userId);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee Not Found or Unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
