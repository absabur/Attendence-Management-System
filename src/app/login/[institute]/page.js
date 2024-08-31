'use client'
import Loading from "@/components/Loading";
import { allDepartments } from "@/data/data";
import Link from "next/link";
import React, { useEffect, useState } from "react";


const Departments = ({ params }) => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const departmentData = allDepartments;

    setDepartments(departmentData);
  }, []);

  const handleChange = (value) => {
    setDepartments(
      allDepartments.filter((inst) =>
        inst.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  return (
    <div className="page">
      <h1>Log In</h1>
      <div id="departmentList" className="links">
        <h2>Choose Department</h2>
        <div
          style={{
            width: "100%",
            display: "flex",
            margin: "10px 0",
            justifyContent: "center",
          }}
        >
          <input
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              border: "none",
              boxShadow: "0 0 5px gray",
            }}
            type="text"
            placeholder="Search for department"
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        {departments.length === 0 && (
          <Loading />
        )}
        {departments.map((dept) => (
          <Link
            href={`/login/${params.institute}/${dept.id}`}
            key={dept.id}
            className="link"
          >
            {dept.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Departments;

