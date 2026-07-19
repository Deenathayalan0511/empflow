import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold fs-4" to="/">
          <i className="bi bi-people-fill me-2"></i>
          EmpFlow
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          {token && (
            <>
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    <i className="bi bi-house-door-fill me-2"></i>
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/working">
                    <i className="bi bi-briefcase-fill me-2"></i>
                    Working
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/filter">
                    <i className="bi bi-funnel-fill me-2"></i>
                    Filter
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">
                    <i className="bi bi-bar-chart-line-fill me-2"></i>
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/ai-report">
                    <i className="bi bi-robot me-2"></i>
                    AI Report
                  </NavLink>
                </li>
              </ul>

              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-white"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person-circle me-2"></i>
                    {user?.name}
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button className="dropdown-item">
                        <i className="bi bi-person me-2"></i>
                        Profile
                      </button>
                    </li>

                    <li>
                      <button className="dropdown-item">
                        <i className="bi bi-gear me-2"></i>
                        Settings
                      </button>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
