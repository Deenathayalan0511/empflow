import express from "express";

import {
    fetchEmployees,
    createEmployee,
    editEmployee,
    removeEmployee
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", fetchEmployees);

router.post("/", createEmployee);

router.put("/:id", editEmployee);

router.delete("/:id", removeEmployee);

export default router;