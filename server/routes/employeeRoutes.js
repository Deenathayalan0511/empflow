import express from "express";

import {
    fetchEmployees,
    createEmployee,
    editEmployee,
    removeEmployee,
    filterEmployees
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", fetchEmployees);

router.get("/filter", filterEmployees);

router.post("/", createEmployee);

router.put("/:id", editEmployee);

router.delete("/:id", removeEmployee);

export default router;