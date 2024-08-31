"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Links = () => {
  const [teacherDetails, setTeacherDetails] = useState(null);

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
          setTeacherDetails(result);
        } catch (error) {
          console.error("Error fetching teacher details:", error);
        }
      }
      const attendResponse = await fetch(
        `http://localhost:4000/attendence?studentId=${null}`
      );
      const attendResult = await attendResponse.json();
      attendResult.forEach((attend) => {
        fetch(`http://localhost:4000/attendence/${attend.id}`, {
          method: "DELETE",
        });
      });

      const dateResponse = await fetch(
        `http://localhost:4000/dates?classId=${null}`
      );
      const dateResult = await dateResponse.json();
      dateResult.forEach((attend) => {
        fetch(`http://localhost:4000/dates/${attend.id}`, {
          method: "DELETE",
        });
      });
    };

    fetchTeacherDetails();
  }, []);
  return (
    <>
      {teacherDetails ? (
        <div>
          <Link className="nav-name" href="/classes">
            Classes
          </Link>
          <Link
            style={{ marginLeft: "20px" }}
            className="nav-name"
            href={`/${teacherDetails?.id}`}
          >
            {teacherDetails?.fullname || "Loading..."}
          </Link>
        </div>
      ) : (
        <div>
          <Link className="nav-name" href="/register">
            Register
          </Link>
          <Link
            style={{ marginLeft: "20px" }}
            className="nav-name"
            href="/login"
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
};

export default Links;
