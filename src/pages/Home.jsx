import { Link } from "react-router-dom";
import { FaBriefcase, FaRocket, FaClock, FaLaptopCode, FaUsers, FaGlobe } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);

    // Scroll animation for feature cards
    const cards = document.querySelectorAll(".feature-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-container">

      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to Job Portal</h1>
          <p>Find your dream job easily and apply in just a few clicks.</p>
          <Link to="/jobs" className="cta-btn">Explore Jobs</Link>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <div className={`feature-card`} data-animate="fade-in">
            <FaClock className="feature-icon" />
            <h3>Easy to Use</h3>
            <p>Intuitive interface to browse and apply for jobs quickly.</p>
          </div>
          <div className={`feature-card`} data-animate="fade-in">
            <FaBriefcase className="feature-icon" />
            <h3>Wide Range of Jobs</h3>
            <p>Thousands of opportunities across multiple industries.</p>
          </div>
          <div className={`feature-card`} data-animate="fade-in">
            <FaRocket className="feature-icon" />
            <h3>Fast Application</h3>
            <p>Apply directly with your profile and resume in seconds.</p>
          </div>
          <div className={`feature-card`} data-animate="fade-in">
            <FaLaptopCode className="feature-icon" />
            <h3>Tech Friendly</h3>
            <p>Submit resumes and portfolios seamlessly online.</p>
          </div>
          <div className={`feature-card`} data-animate="fade-in">
            <FaUsers className="feature-icon" />
            <h3>Verified Employers</h3>
            <p>We partner with trusted companies for safe job postings.</p>
          </div>
          <div className={`feature-card`} data-animate="fade-in">
            <FaGlobe className="feature-icon" />
            <h3>Global Opportunities</h3>
            <p>Explore jobs not just locally, but worldwide.</p>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="cta-section">
        <h2>Ready to Start Your Career?</h2>
        <p>Create your profile and apply to multiple jobs in minutes.</p>
        <Link to="/jobs" className="cta-btn">Get Started</Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Job Portal. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/jobs">Jobs</Link>
          <Link to="/about">About</Link>
        </div>
      </footer>
    </div>
  );
}

export default Home;