import {
  getDashboardStats,
  getDepartmentStats,
} from "../models/dashboardModel.js";

import { generateAIReport } from "../services/geminiService.js";

// =====================================
// GET AI REPORT
// =====================================
export const getAIReport = async (req, res) => {
  try {
    // Get logged-in user's dashboard data
    const overall = await getDashboardStats(req.user.userId);

    const departments = await getDepartmentStats(req.user.userId);

    // Send data to Gemini
    const aiResponse = await generateAIReport(overall, departments);

    // Clean Gemini JSON response
    const cleanResponse = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const report = JSON.parse(cleanResponse);

    const now = new Date();

    res.status(200).json({
      success: true,

      generatedAt: now.toISOString(),

      generatedAtDisplay: now.toLocaleString("en-IN", {
        dateStyle: "full",
        timeStyle: "medium",
        timeZone: "Asia/Kolkata",
      }),

      report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
