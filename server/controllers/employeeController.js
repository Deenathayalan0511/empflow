import {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getFilteredEmployees
} from "../models/employeeModel.js";


// GET
export const fetchEmployees = (req, res) => {

    getEmployees((err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            data: result
        });

    });

};


// filter
export const filterEmployees = (req, res) => {

    const {
        search = "",
        column = "name",
        department = "",
        gender = "",
        sortBy = "id",
        order = "DESC",
        page = 1,
        limit = 5
    } = req.query;

    getFilteredEmployees(
        search,
        column,
        department,
        gender,
        sortBy,
        order,
        Number(page),
        Number(limit),

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            res.json(result);

        }

    );

};


// POST
export const createEmployee = (req, res) => {

    addEmployee(req.body, (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Employee Added Successfully"
        });

    });

};


// PUT
export const editEmployee = (req, res) => {

    updateEmployee(req.params.id, req.body, (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Employee Updated Successfully"
        });

    });

};


// DELETE
export const removeEmployee = (req, res) => {

    deleteEmployee(req.params.id, (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Employee Deleted Successfully"
        });

    });

};