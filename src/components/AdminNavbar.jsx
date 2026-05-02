import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

function AdminNavbar() {
  const navigate = useNavigate();
  const admin = localStorage.getItem("adminEmail");

  const logout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  return (
    <nav className="navbar">
      <h2>Admin Panel</h2>
      <div className="nav-links">
        <Link to="/admin/jobs">Post Jobs</Link>
        <Link to="/admin/applications">Applications</Link>

        {admin && <Link to="/admin/profile">Profile</Link>}

        {!admin && <Link to="/admin/login">Login</Link>}
        {!admin && <Link to="/admin/register">Register</Link>}

        {admin && <button onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
}

export default AdminNavbar;