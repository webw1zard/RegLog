import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar bg-light border-end">
      <h2 className="p-3">MyApp</h2>
      <ul className="nav flex-column p-3">
        <li className="nav-item mb-2">
          <Link to="/register" className="nav-link btn btn-primary w-100">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link btn btn-secondary w-100">
            Already have an Account
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
