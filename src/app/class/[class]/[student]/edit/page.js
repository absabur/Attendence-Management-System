"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./addStudent.css";
import { allDepartments } from "@/data/data";

const AddStudent = ({ params }) => {
  const [classDetails, setClassDetails] = useState({});
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullname: "",
    roll: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const loadClassDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/classes/${params.class}`
        );
        const result = await response.json();
        const studentResponse = await fetch(
          `http://localhost:4000/students?class=${params.class}&id=${params.student}`
        );
        const studentResult = await studentResponse.json();
        setFormData(studentResult[0]);

        let department = null;
        allDepartments.forEach((dept) => {
          if (dept.id == result.department) {
            department = dept.name;
          }
        });

        setClassDetails({
          shift: result.shift,
          semester: result.semester,
          subject: result.subject,
          department: department,
          group: result.group,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    loadClassDetails();
  }, [params.class]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = {
      ...formData,
      updatedAt: new Date(),
    };

    try {
      const response = await fetch(
        `http://localhost:4000/students/${params.student}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(studentData),
        }
      );

      await response.json();
      localStorage.setItem(
        "toast",
        JSON.stringify({
          type: "success",
          message: `Student "${studentData.fullname}" has been updated successfully!`,
        })
      );
      // setTimeout(() => {
      //   localStorage.removeItem("toast");
      // }, 3000);

      router.push(`/class/${params.class}/${params.student}`, {
        scroll: false,
      });
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="add-student-page">
      <div className="class-details">
        <h2>Class Details</h2>
        <table>
          <tbody>
            <tr>
              <td>Department</td>
              <td>{classDetails?.department || "Loading..."}</td>
            </tr>
            <tr>
              <td>Semester</td>
              <td>{classDetails?.semester || "Loading..."}</td>
            </tr>
            <tr>
              <td>Shift</td>
              <td>{classDetails?.shift || "Loading..."}</td>
            </tr>
            <tr>
              <td>Group</td>
              <td>{classDetails?.group || "N/A"}</td>
            </tr>
            <tr>
              <td>Subject</td>
              <td>{classDetails?.subject || "Loading..."}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h1 style={{ marginTop: "10px" }}>Add a student</h1>
      <form
        className="add-student-form"
        id="studentCreateFrom"
        onSubmit={handleSubmit}
      >
        <div>
          <label>Student&apos; Name:</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
            required
            placeholder="Enter student name"
          />
        </div>
        <div>
          <label>Roll:</label>
          <input
            type="text"
            id="roll"
            name="roll"
            value={formData.roll}
            onChange={handleInputChange}
            required
            placeholder="Enter student roll"
          />
        </div>
        <div>
          <label>Email: (optional)</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter student email"
          />
        </div>
        <div>
          <label>Phone: (optional)</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter student phone"
          />
        </div>
        <div>
          <button className="btn" type="submit">Edit</button>
        </div>
      </form>
      <Link className="btn" href={`/class/${params.class}/${params.student}`}>
        Return to student profile
      </Link>
    </div>
  );
};

export default AddStudent;
