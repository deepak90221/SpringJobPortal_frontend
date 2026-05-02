import { useEffect, useState } from "react";
import API from "../services/api";
import "./MyApplications.css";

function MyApplications() {

  const [apps, setApps] = useState([]);
  const [order, setOrder] = useState("asc");

  // Fetch applications
  useEffect(() => {

    const fetchApplications = async () => {
      try {

        const res = await API.get("/applications");
        setApps(res.data);

      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();

  }, []);

  // Delete application
  const handleDelete = async (id) => {

    try {

      if (!window.confirm("Delete this application?")) return;

      await API.delete(`/applications/delete/${id}`);

      setApps(prev => prev.filter(app => app.id !== id));

    } catch (error) {

      console.error("Delete failed:", error);

    }

  };

  // Sorting function
  const sortApplications = () => {

    const sorted = [...apps].sort((a, b) => {
      if (order === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setApps(sorted);
    setOrder(order === "asc" ? "desc" : "asc");
  };

  return (

    <div className="applications-container">

      <h2 className="applications-title">Applications</h2>

      <button
        onClick={sortApplications}
        style={{ marginBottom:"15px", padding:"8px 12px", cursor:"pointer" }}
      >
        Sort {order === "asc" ? "Descending" : "Ascending"}
      </button>

      <table className="applications-table">

        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Skills</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {apps.length === 0 ? (

            <tr>
              <td colSpan="6">No applications found</td>
            </tr>

          ) : (

            apps.map((app, index) => (

              <tr key={app.id}>

                <td>{index + 1}</td>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.skills}</td>

                <td>
                  <span
                    className={
                      app.status === "Accepted"
                        ? "accepted"
                        : app.status === "Rejected"
                        ? "rejected"
                        : "pending"
                    }
                  >
                    {app.status || "Pending"}
                  </span>
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(app.id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default MyApplications;