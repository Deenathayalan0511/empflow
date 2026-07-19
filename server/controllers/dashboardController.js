import {
  getDashboardStats,
  getDepartmentStats,
} from "../models/dashboardModel.js";

// =====================================
// GET DASHBOARD DATA
// =====================================
export const fetchDashboard = async (req, res) => {
  try {
    const overall = await getDashboardStats(req.user.userId);

    const departments = await getDepartmentStats(req.user.userId);

    res.status(200).json({
      success: true,

      overall,

      departments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
