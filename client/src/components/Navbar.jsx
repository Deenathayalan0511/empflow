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
            Home
          </NavLink>

          <NavLink className="nav-link" to="/working">
            Working
          </NavLink>

          <NavLink className="nav-link" to="/filter">
            Filter
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
