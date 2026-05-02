import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { FaTrash, FaDownload, FaEye, FaTimes, FaCheck, FaTimesCircle } from "react-icons/fa";

import "./AdminApplications.css";

function AdminApplications() {
  const [apps, setApps] = useState([]);
  const [viewFile, setViewFile] = useState(null);

  // ================= FETCH ALL APPLICATIONS =================
  const fetchApps = async () => {
    try {
      const res = await API.get("/applications/admin/all");
      setApps(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load applications");
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  // ================= DELETE APPLICATION =================
  const deleteApp = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;

    try {
      await API.delete(`/applications/delete/${id}`);
      toast.success("Application deleted");
      fetchApps(); // refresh table
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete application");
    }
  };

  // ================= UPDATE STATUS =================
  const handleStatus = async (id, status) => {
    try {
      await API.put(
        `/applications/status/${id}`,
        { status },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(`Application ${status}`);
      fetchApps(); // refresh table
    } catch (err) {
      console.error(err.response || err);
      toast.error(err.response?.data || "Failed to update status");
    }
  };

  // ================= VIEW RESUME =================
  const viewResume = (id) => {
    setViewFile(`http://localhost:8888/applications/view/${id}`);
  };

  return (
    <div className="admin-container">
      <h2>All Applications</h2>

      {apps.length === 0 ? (
        <p>No applications submitted yet.</p>
      ) : (
        <table className="applications-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Skills</th>
              <th>Applied On</th>
              <th>Resume</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => (
              <tr key={app.appId}>
                <td>{app.jobTitle}</td>
                <td>{app.company}</td>
                <td>{app.location}</td>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.phone}</td>
                <td>{app.skills}</td>
                <td>{new Date(app.appliedAt).toLocaleString()}</td>
                <td className="resume-actions">
                  <button
                    className="icon-btn"
                    onClick={() => viewResume(app.appId)}
                    title="View Resume"
                  >
                    <FaEye />
                  </button>
                  <a
                    href={`http://localhost:8888/applications/download/${app.appId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Download Resume"
                  >
                    <FaDownload />
                  </a>
                </td>
                <td>
                  <span
                    className={`status-badge ${
                      app.status === "Accepted"
                        ? "accepted"
                        : app.status === "Rejected"
                        ? "rejected"
                        : "pending"
                    }`}
                  >
                    {app.status || "Pending"}
                  </span>
                </td>
                <td>
                  <button
                    className="accept-btn"
                    onClick={() => handleStatus(app.appId, "Accepted")}
                    disabled={app.locked || app.status === "Accepted" || app.status === "Rejected"}
                  >
                    <FaCheck /> Accept
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleStatus(app.appId, "Rejected")}
                    disabled={app.locked || app.status === "Accepted" || app.status === "Rejected"}
                  >
                    <FaTimesCircle /> Reject
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteApp(app.appId)}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ================= MODAL FOR VIEWING RESUME ================= */}
      {viewFile && (
        <div className="modal-overlay" onClick={() => setViewFile(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setViewFile(null)}>
              <FaTimes />
            </button>
            <iframe
              src={viewFile}
              title="Resume Preview"
              width="100%"
              height="600px"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminApplications;