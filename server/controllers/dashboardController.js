import {
  getDashboardStats,
  getDepartmentStats,
} from "../models/dashboardModel.js";

export const fetchDashboard = (req, res) => {
  getDashboardStats((err, dashboardResult) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    getDepartmentStats((err, departmentResult) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.json({
        success: true,

        overall: dashboardResult[0],

        departments: departmentResult,
      });
    });
  });
};
