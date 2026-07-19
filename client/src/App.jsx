import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import WorkingPage from "./pages/WorkingPage";
import FilterPage from "./pages/FilterPage";
import EmployeeDetails from "./pages/EmployeeDetails";
import Dashboard from "./pages/Dashboard";
import AIReportPage from "./pages/AIReportPage";

function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/working"
          element={
            <ProtectedRoute>
              <WorkingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/filter"
          element={
            <ProtectedRoute>
              <FilterPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/:id"
          element={
            <ProtectedRoute>
              <EmployeeDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-report"
          element={
            <ProtectedRoute>
              <AIReportPage />
            </ProtectedRoute>
          }
        />
      </Routes>
       <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
