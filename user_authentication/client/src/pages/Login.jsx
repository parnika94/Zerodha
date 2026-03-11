import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

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

    if (!email || !password) {
      handleError("Please fill in both email and password.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      const { success, message, user } = data;

      if (success) {
        handleSuccess(message);

        // Store user email if needed
        if (user?.username) {
           localStorage.setItem("username", user.username); 
          

           console.log("Saved username:", user.username);   // ✅ Save username here
        }
        else{
          console.warn("⚠️ No username returned from server:", user);
        }


        // Clear inputs
        setInputValue({
          email: "",
          password: "",
        });

        // Redirect to dashboard app after 1.5 sec
        setTimeout(() => {
          window.location.href = "http://localhost:3001"; // ✅ dashboard app
        }, 1500);
      } else {
        handleError(message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      handleError("Network error or server not reachable.");
    }
  };

  return (
    <div className="form_container">
      <h2>Login Account</h2>
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
          Don't have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
