import express from "express";

import { getAIReport } from "../controllers/aiController.js";

const router = express.Router();

router.get("/report", getAIReport);

export default router;