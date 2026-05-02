import { useState, useEffect } from "react";
import API from "../services/api"; // axios instance
import { toast } from "react-toastify";
import "./AdminAuth.css";

function AdminProfile() {
  const [admin, setAdmin] = useState({ id: "", name: "", email: "", password: "" });
  const adminEmail = localStorage.getItem("adminEmail");

  // Fetch admin profile on mount
  useEffect(() => {
    if (adminEmail) {
      API.get(`/admin/profile/${adminEmail}`)
        .then((res) => {
          // Ensure we have the id for update
          setAdmin({ 
            id: res.data.id, 
            name: res.data.name, 
            email: res.data.email, 
            password: res.data.password || "" 
          });
        })
        .catch(() => toast.error("Failed to load admin profile"));
    }
  }, [adminEmail]);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!admin.id) {
      toast.error("Admin ID missing");
      return;
    }

    // Send only the fields we want to update
    API.put(`/admin/update/${admin.id}`, {
      name: admin.name,
      password: admin.password,
    })
      .then(() => toast.success("Profile updated successfully"))
      .catch(() => toast.error("Failed to update profile"));
  };

  return (
    <div className="container">
      <h2>Admin Profile</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name</label>
          <input
            name="name"
            value={admin.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email (cannot change)</label>
          <input
            name="email"
            value={admin.email}
            disabled
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={admin.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default AdminProfile;