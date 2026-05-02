import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import "./Profile.css"; // Make sure to include the CSS provided

function Profile() {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", password: "", phone: "" });

  const email = localStorage.getItem("email");

  // ================= FETCH USER PROFILE =================
  useEffect(() => {
    API.get(`/auth/profile/${email}`)
      .then(res => {
        setUser(res.data);
        setForm({
          name: res.data.name || "",
          password: "",
          phone: res.data.phone || ""
        });
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to load profile");
      });
  }, [email]);

  // ================= HANDLE FORM CHANGE =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= UPDATE ACCOUNT =================
  const handleUpdate = async () => {
    if (!form.name || !form.password) {
      toast.error("Name and Password cannot be empty");
      return;
    }

    try {
      const res = await API.put(`/auth/update/${email}`, form);
      toast.success(res.data || "Account updated");
      setEditMode(false);
      // Refresh user data
      const updatedUser = await API.get(`/auth/profile/${email}`);
      setUser(updatedUser.data);
      setForm({
        name: updatedUser.data.name || "",
        password: "",
        phone: updatedUser.data.phone || ""
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data || "Failed to update account");
    }
  };

  // ================= DELETE ACCOUNT =================
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      const res = await API.delete(`/auth/delete/${email}`);
      toast.success(res.data || "Account deleted");
      localStorage.clear();
      window.location.href = "/"; // redirect to home after deletion
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data || "Failed to delete account");
    }
  };

  return (
    <div className="container">
      <h2>Profile</h2>

      {!editMode ? (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.id}</p>

          <div className="button-group">
            <button onClick={() => setEditMode(true)}>Edit Profile</button>
            <button className="delete-btn" onClick={handleDelete}>Delete Account</button>
          </div>
        </>
      ) : (
        <div className="edit-form">
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="button-group">
            <button className="save-btn" onClick={handleUpdate}>Save Changes</button>
            <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
            <button className="delete-btn" onClick={handleDelete}>Delete Account</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;