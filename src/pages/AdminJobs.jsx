import { useEffect, useState } from "react";
import API from "../services/api";
import "./AdminJobs.css";

function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: ""
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all jobs
  const getJobs = () => {
    API.get("/jobs/all").then(res => setJobs(res.data));
  };

  useEffect(() => {
    getJobs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new job
  const addJob = async (e) => {
    e.preventDefault();
    if (editingId) return updateJob();
    await API.post("/jobs/add", form);
    setForm({ title: "", company: "", location: "", description: "" });
    getJobs();
  };

  // Edit job
  const editJob = (job) => {
    setForm({
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description
    });
    setEditingId(job.id);
  };

  // Update job
  const updateJob = async () => {
    if (!editingId) return;
    await API.put(`/jobs/update/${editingId}`, form);
    setForm({ title: "", company: "", location: "", description: "" });
    setEditingId(null);
    getJobs();
  };

  // Delete job
  const deleteJob = async (id) => {
    await API.delete(`/jobs/delete/${id}`);
    getJobs();
  };

  return (
    <div className="admin-container">
      <h2>Admin Job Management</h2>

      <form onSubmit={addJob} className="job-form">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <button type="submit">{editingId ? "Update Job" : "Add Job"}</button>
        {editingId && <button type="button" onClick={() => { setForm({ title: "", company: "", location: "", description: "" }); setEditingId(null); }}>Cancel</button>}
      </form>

      <h3>All Jobs</h3>
      <table className="jobs-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Description</th>
            <th>Posted At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.company}</td>
              <td>{job.location}</td>
              <td>{job.description}</td>
              <td>{new Date(job.createdAt).toLocaleString()}</td>
              <td>
                <div className="actions">
                  <button className="edit-btn" onClick={() => editJob(job)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteJob(job.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminJobs;