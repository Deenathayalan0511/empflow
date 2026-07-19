import express from "express";

import { getAIReport } from "../controllers/aiController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/report", authMiddleware, getAIReport);

export default router;
