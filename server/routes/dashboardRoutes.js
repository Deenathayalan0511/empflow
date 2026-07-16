import express from "express";

import { fetchDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", fetchDashboard);

export default router;
