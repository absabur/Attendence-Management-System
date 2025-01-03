"use client";
import { allDepartments, allInstitutes } from "@/data/data";
import React, { useState, useEffect } from "react";
import "./Profile.css";
import Link from "next/link";

import { useRouter } from "next/navigation";

const Profile = ({params}) => {
  
  const router = useRouter();
  const [teacherDetails, setTeacherDetails] = useState(null);

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      const token = JSON.parse(localStorage.getItem("attendencetoken"));
      if (token) {
        const teacherId = token.id;
        try {
          const response = await fetch(
            `http://localhost:4000/teachers/${teacherId}`,
            { cache: "no-store" }
          );
          const result = await response.json();
          setTeacherDetails(result);
        } catch (error) {
          console.error("Error fetching teacher details:", error);
        }
      }
    };

    fetchTeacherDetails();
  }, []);

  if (!teacherDetails) {
    return <p>Loading teacher details...</p>;
  }

  const getInstituteName = (id) => {
    const institute = allInstitutes.find((inst) => inst.id === id);
    return institute ? institute.name : "N/A";
  };

  const getDepartmentName = (id) => {
    const department = allDepartments.find((dept) => dept.id === id);
    return department ? department.name : "N/A";
  };

  return (
    <div className="teacher-details-page">
      <h2>Teacher Details</h2>
      <div className="detail">
        <div>Name</div> {teacherDetails.fullname}
      </div>
      <div className="detail">
        <div>Email</div> {teacherDetails.email || "Not provided"}
      </div>
      <div className="detail">
        <div>Phone</div> {teacherDetails.phone || "Not provided"}
      </div>
      <div className="detail">
        <div>Username</div> {teacherDetails.username}
      </div>
      <div className="detail">
        <div>Institute</div> {getInstituteName(teacherDetails.institute)}
      </div>
      <div className="detail">
        <div>Department</div> {getDepartmentName(teacherDetails.department)}
      </div>
      <div className="profile-page-buttons">
        <button
          className="btn logout"
          onClick={() => {
            let con = window.confirm("Are you sure you want to Logout?");
            if (con) {
              localStorage.clear();
              localStorage.setItem(
                "toast",
                JSON.stringify({
                  type: "info",
                  message: `Logged out successfully`,
                })
              );
              router.push("/", { scroll: false });
            }
          }}
        >
          Logout
        </button>
        <button className="btn update-btn">
          <Link href={`/${params.teacher}/update`}>Edit Profile</Link>
        </button>
      </div>
    </div>
  );
};

export default Profile;
