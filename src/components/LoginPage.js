"use client";
import Link from "next/link";
import React, { useState } from "react";
import "./register.css";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [redirect, setRedirect] = useState(0);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    username: "",
    department: "",
    institute: "",
    password: "",
    cpassword: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let exists = await fetch(
      `http://localhost:4000/teachers?username=${formData.username}&password=${formData.password}&cpassword=${formData.password}`
    );
    exists = await exists.json();
    if (!exists[0]) {
      localStorage.setItem(
        "toast",
        JSON.stringify({
          type: "warning",
          message: `Username or password did not match!`,
        })
      );
      // setTimeout(() => {
      //   localStorage.removeItem("toast");
      // }, 3000);

      return;
    }
    localStorage.setItem(
      "attendencetoken",
      JSON.stringify({
        id: exists[0].id,
        name: exists[0].fullname,
        institute: exists[0].institute,
        department: exists[0].department,
      })
    );
    let sec = 3;
    setInterval(() => {
      setRedirect(sec);
      sec--;
    }, 1000);
    localStorage.setItem(
      "toast",
      JSON.stringify({ type: "success", message: `Loged in successfull!` })
    );
    // setTimeout(() => {
    //   localStorage.removeItem("toast");
    // }, 3000);

    router.push("/classes", { scroll: false });
  };

  return (
    <div className="register-page">
      <h1>Login Using Username</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>
        <div>
          <button className="btn" type="submit">Login</button>
        </div>
        <div>
          Don't have an account? <Link href="/register">register</Link>
        </div>
      </form>
      {redirect != 0 && (
        <div className="redirecting">Redirecting in {redirect} second</div>
      )}
    </div>
  );
};

export default LoginPage;
