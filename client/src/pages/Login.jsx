

import { useState } from "react";
import { Link } from "react-router-dom";
function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSuccess(false);

    if (email === "" || password === "") {
      setMessage("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setMessage("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be atleast 6 characters");
      return;
    }

    const response = await fetch("https://glow-and-grace-c15y.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage(data.message);
      setIsSuccess(true);
      setUser(data.user);

      localStorage.setItem("user", JSON.stringify(data.user));
    } else {
      setMessage(data.error);
      setIsSuccess(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-card">

        <h1>Welcome Back</h1>

        <p>Login to your Glow & Grace account</p>
        <br />

        <form onSubmit={handleSubmit} noValidate>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {message && <p className={isSuccess ? "success-message" : "login-message"}>{message}</p>}

          <button type="submit">
            Login
          </button>
          <p className="register-text">
            Don't have an account?{" "}
            <Link to="/register">Create an Account</Link>
          </p>


        </form>

      </div>
    </main>
  );
}

export default Login;