"use client";
import { allDepartments, allInstitutes } from "@/data/data";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import "./register.css";
import { useRouter } from "next/navigation";

const TeacherForm = () => {
  const router = useRouter();
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

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      const token = JSON.parse(localStorage.getItem("attendencetoken"));
      if (token) {
        const teacherId = token.id;
        try {
          const response = await fetch(
            `http://localhost:4000/teachers/${teacherId}`
          );
          const result = await response.json();
          setFormData(result);
        } catch (error) {
          console.error("Error fetching teacher details:", error);
        }
      }
    };

    fetchTeacherDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let exists = await fetch(
      `http://localhost:4000/teachers?username=${formData.username}`
    );
    exists = await exists.json();
    if (exists[0] && exists[0].id != formData.id) {
      localStorage.setItem(
        "toast",
        JSON.stringify({ type: "warning", message: "Username already exists!" })
      );
      // setTimeout(() => {
      //   localStorage.removeItem("toast");
      // }, 3000);
      return;
    }

    const response = await fetch(
      `http://localhost:4000/teachers/${formData.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          updatedAt: new Date(),
        }),
      }
    );

    const result = await response.json();
    localStorage.setItem(
      "toast",
      JSON.stringify({
        type: "success",
        message: `Teacher "${formData.fullname}" has been updated successfully!`,
      })
    );
    // setTimeout(() => {
    //   localStorage.removeItem("toast");
    // }, 3000);
    setFormData(result);
    router.push("/classes", { scroll: false });
  };

  const handleLogout = () => {
    let con = window.confirm("Are you sure you want to Logout?");
    if (con) {
      localStorage.clear();
      localStorage.setItem(
        "toast",
        JSON.stringify({
          type: "info",
          message: `Loged out successfully`,
        })
      );
      router.push("/", { scroll: false });
    }
  };
  return (
    <div className="register-page">
      <h1>Update Profile</h1>
      <button onClick={handleLogout}>Logout</button>
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
          <button className="btn" type="submit">Update</button>
        </div>
      </form>
      <Link className="btn" href={`/classes`}>
        Return to classes
      </Link>
    </div>
  );
};

export default TeacherForm;
