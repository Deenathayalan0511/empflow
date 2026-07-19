import express from "express";

import {
  fetchEmployees,
  createEmployee,
  editEmployee,
  removeEmployee,
  filterEmployees,
  fetchEmployeeById,
} from "../controllers/employeeController.js";

import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, fetchEmployees);

router.get("/filter", authMiddleware, filterEmployees);

router.get("/:id", authMiddleware, fetchEmployeeById);

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createEmployee
);

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  editEmployee
);

router.delete("/:id", authMiddleware, removeEmployee);

export default router;