import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AdminAuth.css";

function AdminRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/admin/register", form);
      toast.success("Admin Registered Successfully");
      navigate("/admin/login");
    } catch (err) {
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="container">
      <h2>Admin Register</h2>
      <form onSubmit={submit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button>Register</button>
      </form>
    </div>
  );
}

export default AdminRegister;