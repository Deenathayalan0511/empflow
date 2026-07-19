import express from "express";

import { fetchDashboard } from "../controllers/dashboardController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, fetchDashboard);

export default router;
