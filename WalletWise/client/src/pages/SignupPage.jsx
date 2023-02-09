import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://beautiful-lion-gown.cyclic.app/api/signup";
      // const url = "http://localhost:3000/api/signup";
      const { data: res } = await axios.post(url, data);
      navigate("/home");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="signup-container">
        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <input
            type="text"
            placeholder="User Name"
            name="userName"
            onChange={handleChange}
            value={data.userName}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
          />
          {error && <div className="signup-error-message">{error}</div>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="login-message">
        <p>
          Already an existing user?
          <Link to="/">
            <span> Log back in</span>
          </Link>
        </p>
      </div>
    </>
  );
}
