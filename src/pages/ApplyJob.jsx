import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api"; // Axios instance with baseURL
import { toast } from "react-toastify";

function ApplyJob() {
  const { id } = useParams(); // Job ID from URL

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
  });

  const [file, setFile] = useState(null); // Resume file
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload your resume");
      return;
    }

    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("phone", form.phone);
    data.append("skills", form.skills);
    data.append("jobId", id);
    data.append("file", file);

    try {
      setLoading(true);
      await API.post("/applications/apply", data);
      toast.success("Application Submitted Successfully");
      setForm({ name: "", email: "", phone: "", skills: "" });
      setFile(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Apply for Job</h2>
      <form onSubmit={submit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          name="skills"
          placeholder="Skills"
          value={form.skills}
          onChange={handleChange}
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default ApplyJob;