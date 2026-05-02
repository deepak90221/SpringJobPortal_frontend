import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import AdminProfile from "./pages/AdminProfile";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import ApplyJob from "./pages/ApplyJob";
import MyApplications from "./pages/MyApplications";

import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminJobs from "./pages/AdminJobs";
import AdminApplications from "./pages/AdminApplications";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      {/* User Navbar */}
      <Navbar />

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/apply/:id" element={<ApplyJob />} />
        <Route path="/my-applications" element={<MyApplications />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route
          path="/admin/jobs"
          element={
            <>
              <AdminNavbar />
              <AdminJobs />
            </>
          }
        />
        <Route
          path="/admin/applications"
          element={
            <>
              <AdminNavbar />
              <AdminApplications />
            </>
          }
        />
        {/* Admin Profile */}
        <Route
          path="/admin/profile"
          element={
            <>
              <AdminNavbar />
              <AdminProfile />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;