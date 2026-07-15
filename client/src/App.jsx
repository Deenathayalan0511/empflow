import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import WorkingPage from "./pages/WorkingPage";
import FilterPage from "./pages/FilterPage";
import EmployeeDetails from "./pages/EmployeeDetails";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/working" element={<WorkingPage />} />

        <Route path="/filter" element={<FilterPage />} />

        <Route path="/employee/:id" element={<EmployeeDetails />} />
      </Routes>
    </>
  );
}

export default App;
