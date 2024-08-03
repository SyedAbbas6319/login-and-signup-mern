import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
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

  const register = async (e) => {
    e.preventDefault(); // Prevent form from submitting the default way
    const { name, email, password } = user;
    if (name && email && password) {
      try {
        const res = await axios.post(
          "http://localhost:6969/auth/register",
          user,
          { withCredentials: true }
        );
        alert(res.data.message);
        navigate("/login");
      } catch (err) {
        console.error("Registration error", err.response);
        alert(
          err.response?.data?.message ||
            "Registration failed. Please try again."
        );
      }
    } else {
      alert("Invalid input. Please fill all fields.");
    }
  };

  return (
    <div
      className="container rounded-custom  mt-5"
      style={{ minHeight: '600px'  ,minWidth:'600px'}} // Adjust the min-height value as needed
    >
      <div className="row justify-content-center">
        <div className="col-12 col-md-7 col-lg-8 justify-content-center">
          <div
            className="row rounded-custom shadow-lg overflow-hidden login-form"
            style={{ minHeight: '600px' ,minWidth:'600px'}} // Adjust the min-height value as needed
          >
            <div
              className="col-12 col-md-6 p-0 d-flex align-items-stretch"
              style={{ minHeight: '600px' }} // Ensure the video container has the same height
            >
              <video
                src="my-video.mp4"
                autoPlay
                loop
                muted
                className="img-fluid h-100 w-100"
                style={{ objectFit: "cover", minHeight: '600px' }} // Adjust the min-height value as needed
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
                  <h3>Create a new account</h3>
                </div>
                <form onSubmit={register}>
                  <div className="mt-3 mb-3">
                    <input
                      type="text"
                      className="form-control bg-light"
                      id="name"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  <div className="mt-3 mb-3">
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
                  <div className="mt-3 mb-3">
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
                    Register
                  </button>
                </form>
                <div className="mt-2">
                  <h6>
                    Already have an account?{" "}
                    <a href="/login" className="text-primary no-underline">
                      Sign in
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

export default Register;
