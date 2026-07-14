import {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeCount
} from "../models/employeeModel.js";



// GET ALL
export const fetchEmployees = (req, res) => {

    const {
        search = "",
        column = "name",
        department = "",
        gender = "",
        sortBy = "id",
        order = "ASC",
        page = 1,
        limit = 5
    } = req.query;

    getEmployees(
        search,
        column,
        department,
        gender,
        sortBy,
        order,
        page,
        limit,
        (err, result) => {

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

        }
    );

};


// GET ONE

export const fetchEmployee = (req, res) => {

    const id = req.params.id;

    getEmployeeById(id, (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        if (result.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });

        }

        res.json({
            success: true,
            data: result[0]
        });

    });

};

export const employeeCount = (req, res) => {

    getEmployeeCount((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);

    });

};

// CREATE

export const addEmployee = (req, res) => {

    const {
        name,
        email,
        gender,
        salary,
        department
    } = req.body;

    if (
        !name ||
        !email ||
        !salary ||
        !gender ||
        !department
    ) {

        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });

    }

    createEmployee(
        {
            name,
            email,
            salary,
            gender,
            department
        },
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            res.status(201).json({

                success: true,

                message: "Employee Added Successfully",

                employeeId: result.insertId

            });

        }
    );

};


// UPDATE

export const editEmployee = (req, res) => {

    const id = req.params.id;

    const {
        name,
        email,
        salary,
        gender,
        department
    } = req.body;

    updateEmployee(
        id,
        {
            name,
            email,
            salary,
            gender,
            department
        },
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({

                    success: false,

                    message: "Employee not found"

                });

            }

            res.json({

                success: true,

                message: "Employee Updated Successfully"

            });

        }
    );

};


// DELETE

export const removeEmployee = (req, res) => {

    const id = req.params.id;

    deleteEmployee(id, (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        if (result.affectedRows === 0) {

            return res.status(404).json({

                success: false,

                message: "Employee not found"

            });

        }

        res.json({

            success: true,

            message: "Employee Deleted Successfully"

        });

    });

};