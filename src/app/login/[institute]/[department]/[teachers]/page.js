"use client";
import React, { useEffect, useState } from "react";
import "./pass.css";
import { allDepartments, allInstitutes } from "@/data/data";
import { useRouter } from "next/navigation";

const PasswordPage = ({ params }) => {
  const [selectedInstitute, setSelectedInstitute] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [selectedTeacher, setSelectedTeacher] = useState();
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

    const getTeacher = async () => {
      let teacher = await fetch(
        `http://localhost:4000/teachers/${params.teachers.slice(-4)}`
      );
      teacher = await teacher.json();
      setSelectedTeacher(teacher.fullname);
    };

    getTeacher();

    setSelectedInstitute(inst.name);
    setSelectedDepartment(dept.name);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const teacherId = params.teachers.slice(-4);
      const response = await fetch(
        `http://localhost:4000/teachers?id=${teacherId}`,
        {
          method: "GET",
        }
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
            JSON.stringify({ type: "success", message: `Loged in Successfull!` })
          );
          // setTimeout(() => {
          //   localStorage.removeItem("toast");
          // }, 3000);

          router.push("/classes", { scroll: false });
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
    <div className="password-page">
      <h1>Log In</h1>
      <form className="password-form" id="passwordForm" onSubmit={handleSubmit}>
        <div id="selectedPath" className="selectedPath">
          <div>Institute: {selectedInstitute}</div>
          <div>Department: {selectedDepartment}</div>
          <div>Teacher Name: {selectedTeacher}</div>
        </div>
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
        <div style={{ display: "flex" }}>
          <button className="btn" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default PasswordPage;
