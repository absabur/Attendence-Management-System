"use client";
import { allDepartments, allInstitutes } from "@/data/data";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import "./register.css";
import UnAuthCheck from "@/components/UnAuthCheck";

const TeacherForm = () => {
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

    if (formData.password !== formData.cpassword) {
      localStorage.setItem(
        "toast",
        JSON.stringify({ type: "warning", message: `Passwords did not match!` })
      );
      // setTimeout(() => {
      //   localStorage.removeItem("toast");
      // }, 3000);

      return;
    }

    let exists = await fetch(
      `http://localhost:4000/teachers?username=${formData.username}`, { cache: "no-store"}
    );
    exists = await exists.json();
    if (exists[0]) {
      localStorage.setItem(
        "toast",
        JSON.stringify({ type: "warning", message: `Username already exists!` })
      );
      // setTimeout(() => {
      //   localStorage.removeItem("toast");
      // }, 3000);

      return;
    }

    const response = await fetch("http://localhost:4000/teachers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      cache: "no-store"
    });

    await response.json();
    localStorage.setItem(
      "toast",
      JSON.stringify({
        type: "success",
        message: `Teacher "${formData.fullname}" has been created successfully!`,
      })
    );
    // setTimeout(() => {
    //   localStorage.removeItem("toast");
    // }, 3000);

    router.push("/login", { scroll: false });
  };

  return (
    <>
      <UnAuthCheck />
      <div className="register-page">
        <h1>Create Teacher Profile</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <div>
            <label>Your Name:</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label>Email: (optional)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label>Phone: (optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Write a unique username"
            />
          </div>
          <div>
            <label>Your Institute:</label>
            <select
              id="instituteselect"
              name="institute"
              value={formData.institute}
              onChange={handleChange}
              required
            >
              <option value="">Choose</option>
              {allInstitutes.map((institute) => (
                <option key={institute.id} value={institute.id}>
                  {institute.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Your Department:</label>
            <select
              id="departmentselect"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Choose</option>
              {allDepartments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
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
            <label>Confirm Password:</label>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              value={formData.cpassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
          </div>
          <div>
            <button className="btn" type="submit">Create</button>
          </div>
          <div>
            Already have an account? <Link href="/login">Login</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default TeacherForm;
