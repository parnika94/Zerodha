import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  

   const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password || !username) {
    handleError("Please fill in all fields.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:4000/signup",
      { ...inputValue },
      { withCredentials: true }
    );

    console.log("📦 Signup response:", response.data); // 👈 log whole response

    const { success, message, user } = response.data;

    if (success) {
      if (user?.username) {
        localStorage.setItem("username", user.username); 
        window.location.reload(); // 🔁 Force refresh to re-read localStorage in Menu.js
       // ✅ fixed here
        console.log("✅ Stored username:", user.username);
      } else {
        console.warn("⚠️ No username in response user object:", user);
      }

      handleSuccess("Signup successful! Please log in.");

      setInputValue({ email: "", password: "", username: "" });

      setTimeout(() => {
        navigate("/login");
        window.location.reload(); // ✅ This line is important
      }, 1500);

    } else {
      handleError(message || "Signup failed");
    }
  } catch (error) {
    console.error("❌ Signup error:", error.message);
    handleError("Network error or server not reachable.");
  }
};
 
    
  return (
    <div className="form_container">
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
