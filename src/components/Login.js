"use client";
import { allDepartments, allInstitutes } from "@/data/data";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Login = ({ params }) => {
  const [password, setPassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    let dept = allDepartments.find((dept) => dept.id === params.department);
    let inst = allInstitutes.find((inst) => inst.id === params.institute);

    if (!dept || !inst) {
      localStorage.setItem(
        "toast",
        JSON.stringify({ type: "warning", message: `Invalid Login Data` })
      );
      // setTimeout(() => {
      //   localStorage.removeItem("toast");
      // }, 3000);

      router.push("/login", { scroll: false });
      return;
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const teacherUsername = params.teachers;
      const response = await fetch(
        `http://localhost:4000/teachers?username=${teacherUsername}`, { cache: "no-store"}
      );

      const result = await response.json();
      if (result[0]) {
        const teacher = result[0];
        if (teacher.password === password) {
          localStorage.setItem(
            "attendencetoken",
            JSON.stringify({
              id: teacher.id,
              name: teacher.fullname,
              institute: teacher.institute,
              department: teacher.department,
            })
          );
          localStorage.setItem(
            "toast",
            JSON.stringify({
              type: "success",
              message: `Loged in Successfull!`,
            })
          );
          // setTimeout(() => {
          //   localStorage.removeItem("toast");
          // }, 3000);

          router.push(`/${teacher.id}/classes`, { scroll: false });
        } else {
          localStorage.setItem(
            "toast",
            JSON.stringify({ type: "warning", message: `Incorrect Password!` })
          );
          // setTimeout(() => {
          //   localStorage.removeItem("toast");
          // }, 3000);
        }
      } else {
        localStorage.setItem(
          "toast",
          JSON.stringify({ type: "warning", message: `Teacher not found!` })
        );
        // setTimeout(() => {
        //   localStorage.removeItem("toast");
        // }, 3000);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <form className="password-form" id="passwordForm" onSubmit={handleSubmit}>
      <div className="pass-field">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
      </div>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <button className="btn" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
