import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useNavigate } from "react-router-dom";

const Homepage = ({ user, logout }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // const handleLogout = async () => {
  //   try {
  //     await logout(); // Call the logout function passed as a prop
  //     alert("You have been logged out."); // Show the alert popup
  //     navigate("/login"); // Redirect to the login page
  //   } catch (err) {
  //     console.error("Logout failed", err);
  //   }
  // };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            BrandName
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            
            {user && (
              <div className="d-flex align-items-center m-auto">
                <span className="navbar-text mx-3 text-white">
                  Welcome, {user.email}
                </span>
               
              </div>
            )}<ul className="navbar-nav ">
              <li className="nav-item">
                <a
                  className="nav-link active ml-5"
                  aria-current="page"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contact
                </a>
              </li>
              {/* <button
                  className="btn btn-outline-light ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button> */}
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="hero"
        style={{
          backgroundImage: "url(/hero.jpg)",
          backgroundSize: "cover",
          height: "600px",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white"
        }}
      >
        <div className="container">
          <h1>Welcome to the Home Page</h1>
          <p>Your one-stop solution for all your needs</p>
          <a href="#" className="btn btn-primary mx-2">
            Get Started
          </a>
          <a href="#" className="btn btn-outline-light mx-2">
            Learn More
          </a>
        </div>
      </div>

      {/* Cards Section */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <video autoPlay muted loop>
                <source src="card-video1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <video autoPlay muted loop>
                <source src="card-video2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <video autoPlay muted loop>
                <source src="card-video3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5 w-100">
        <div className="container text-center">
          <p className="mb-0">&copy; 2024 CryptoApp. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Homepage;
