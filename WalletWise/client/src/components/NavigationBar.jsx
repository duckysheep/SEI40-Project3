import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function NavigationBar() {
  const navigate = useNavigate();
  const [userinfo, setUserInfo] = UserAuth();

  const handleLogout = () => {
    setUserInfo({ email: null, id: null, loading: false });
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navigation-bar">
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/accounts-overview">Accounts Overview</Link>
          </li>
          <li>
            <Link to="/transactions-history">Transactions History</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
