import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          EmpFlow
        </NavLink>

        <div className="navbar-nav ms-auto">
          <NavLink className="nav-link" to="/">
            <i className="bi bi-house-door-fill me-2"></i>
            Home
          </NavLink>

          <NavLink className="nav-link" to="/working">
            <i className="bi bi-briefcase-fill  me-2"></i> Working
          </NavLink>

          <NavLink className="nav-link" to="/filter">
            <i className="bi bi-funnel-fill me-2"></i>
            Filter
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
