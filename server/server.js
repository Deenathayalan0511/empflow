import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import employeeRoutes from "./routes/employeeRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ===============================
// CORS CONFIGURATION
// ===============================
app.use(
  cors({
    origin: "http://localhost:5173", // React URL

    credentials: true,
  }),
);

// ===============================
// MIDDLEWARE
// ===============================
app.use(express.json());

app.use(cookieParser());

// ===============================
// STATIC FILES
// ===============================
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ===============================
// ROUTES
// ===============================
app.use("/api/auth", authRoutes);

app.use("/api/employees", employeeRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/ai", aiRoutes);

// ===============================
// TEST API
// ===============================
app.get("/", (req, res) => {
  res.send("Employee Management API Running");
});

// ===============================
// SERVER
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
