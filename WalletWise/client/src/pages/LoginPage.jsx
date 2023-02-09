import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LoginPage({ setUserId }) {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const url = "https://beautiful-lion-gown.cyclic.app/api/login";
      const url = "http://localhost:3000/api/login/";
      const { data: res } = await axios.post(url, data);
      console.log(data);
      localStorage.setItem("token", res.data);
      window.location = "/home";
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
    <div className="login-container">
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
          <h1>Login to Your Account</h1>
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
          {error && <div className="login-error-message">{error}</div>}
          <button type="submit">Sign In</button>
        </form>
        <div className="new-signup-message">
          <p>
            New here?
            <Link to="/signup">
              <button type="button">Sign Up Now</button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
