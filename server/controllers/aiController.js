import {
  getDashboardStats,
  getDepartmentStats,
} from "../models/dashboardModel.js";

import { generateAIReport } from "../services/geminiService.js";

export const getAIReport = (req, res) => {
  getDashboardStats(async (err, dashboardResult) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    getDepartmentStats(async (err, departmentResult) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      try {
        const overall = dashboardResult[0];

        const departments = departmentResult;

        const aiResponse = await generateAIReport(overall, departments);

        // Remove ```json and ``` if Gemini returns them
        const cleanResponse = aiResponse
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        const report = JSON.parse(cleanResponse);

        const now = new Date();

        res.json({
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
    });
  });
};
