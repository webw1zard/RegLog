import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .get("https://fake-api-dfa7.onrender.com/users")
      .then((response) => {
        const user = response.data.find(
          (u: any) => u.email === email && u.password === password
        );

        if (user) {
          localStorage.setItem("userId", user.id);
          toast.success("Login successful!");
          navigate("/cabinet");
        } else {
          toast.error("Invalid email or password!");
        }
      })
      .catch(() => {
        toast.error("An error occurred while logging in!");
      });
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <div><span className="fo">Dont have an Account:</span><Link to="/register" className="btn btn-secondary form-control mt-2 w-25 ml-5 gh">
          Register
        </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
