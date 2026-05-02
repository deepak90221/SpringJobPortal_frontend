import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import "./jobs.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    API.get("/jobs/all").then(res => setJobs(res.data));
  }, []);

  return (
    <div className="jobs-container">
      {jobs.map(job => (
        <div className="jobCard" key={job.id}>
          {/* Ribbon */}
          <div className="ribbon">Apply Soon!</div>

          <div className="job-content">
            <p><strong>Title:</strong> {job.title}</p>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Posted:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
          </div>

          <Link to={`/apply/${job.id}`}>
            <button className="apply-btn">Apply Now</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Jobs;