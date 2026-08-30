import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
function Navbar() {
  const navigate = useNavigate();

  const user = localStorage.getItem("email");
  const admin = localStorage.getItem("adminEmail");

  const logoutUser = () => {
    localStorage.removeItem("email");
    navigate("/login");
  };

  const logoutAdmin = () => {
    localStorage.removeItem("adminEmail");
    navigate("/admin/login");
  };

  return (
    <nav className="navbar">
      <h2>JobPortal</h2>

      <div>
        {/* Common Links */}
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
        

        {/* Admin Logged In */}
        {admin && (
          <>
            <Link to="/admin/jobs">Admin Jobs</Link>
            <Link to="/admin/applications">Admin Applications</Link>
            
            <button onClick={logoutAdmin}>Logout</button>
          </>
        )}

        {/* User Logged In */}
        {!admin && user && (
          <>
            <Link to="/my-applications">My Applications</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={logoutUser}>Logout</button>
          </>
        )}

        {/* No one logged in */}
        {!admin && !user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/admin/login">Admin Login</Link>
            <Link to="/admin/register">Admin Register</Link>

          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;