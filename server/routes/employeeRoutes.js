import express from "express";

import {
    fetchEmployees,
    createEmployee,
    editEmployee,
    removeEmployee,
    filterEmployees
} from "../controllers/employeeController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", fetchEmployees);

router.get("/filter", filterEmployees);

router.post(
    "/",
    upload.single("image"),
    createEmployee
);

router.put(
    "/:id",
    upload.single("image"),
    editEmployee
);

router.delete("/:id", removeEmployee);

export default router;