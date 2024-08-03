import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      console.log("Login payload:", user); // Log the request payload
      const res = await axios.post(
        "http://localhost:6969/auth/login",
        user,
        { withCredentials: true }
      );
      console.log("Login response:", res); // Log the response
      alert(res.data.message);
      setLoginUser(res.data.user);
      navigate("/");
    } catch (err) {
      console.error("Login error response:", err.response?.data || err); // Log the error response
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div
      className="container rounded-custom mt-5"
      style={{ minHeight: "600px", minWidth: "600px" }}
    >
      <div className="row justify-content-center">
        <div className="col-12 col-md-7 col-lg-8 justify-content-center">
          <div
            className="row rounded-custom shadow-lg overflow-hidden login-form"
            style={{ minHeight: "600px", minWidth: "600px" }}
          >
            <div
              className="col-12 col-md-6 p-0 d-flex align-items-stretch"
              style={{ minHeight: "600px" }}
            >
              <video
                src="my-video.mp4"
                autoPlay
                loop
                muted
                className="img-fluid h-100 w-100"
                style={{ objectFit: "cover", minHeight: "600px" }}
                alt="Login Video"
              ></video>
            </div>

            <div className="col-12 col-md-6 bg-dark text-white p-4 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="favicon2.png"
                    alt="Logo"
                    className="img-fluid w-25"
                  />
                  <h2 className="mb-0 text-orange">Syed Abbas</h2>
                </div>
                <div className="mb-3 mt-3">
                  <h3>Sign into your account</h3>
                </div>
                <form onSubmit={login}>
                  <div className="mt-4 mb-4">
                    <input
                      type="email"
                      className="form-control bg-light"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      placeholder="Email address"
                      required
                    />
                  </div>
                  <div className="mt-4 mb-4">
                    <input
                      type="password"
                      className="form-control bg-light"
                      id="password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      placeholder="Password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-3 mb-2 btn btn-primary w-100"
                  >
                    Login
                  </button>
                </form>
                <div className="mt-2">
                  <h6>
                    Don't have an account?{" "}
                    <a href="/register" className="text-primary no-underline">
                      Register here
                    </a>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
