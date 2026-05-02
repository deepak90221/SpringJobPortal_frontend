import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AdminAuth.css";
function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/admin/login", form);
      if (res.data) {
        localStorage.setItem("adminEmail", res.data.email);
        localStorage.setItem("adminId", res.data.id);
        toast.success("Admin Login Successful");
        navigate("/admin/jobs");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (err) {
      toast.error("Login Failed");
    }
  };

  return (
    <div className="container">
      <h2>Admin Login</h2>
      <form onSubmit={submit}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;