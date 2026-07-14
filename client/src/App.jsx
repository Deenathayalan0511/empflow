import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import WorkingPage from "./pages/WorkingPage";
import FilterPage from "./pages/FilterPage";

function App() {

    return (
        <>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/working"
                    element={<WorkingPage />}
                />

                <Route
                    path="/filter"
                    element={<FilterPage />}
                />

            </Routes>

        </>
    );
}

export default App;