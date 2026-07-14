import {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
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