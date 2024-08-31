"use client";
import Loading from "@/components/Loading";
import { allDepartments } from "@/data/data";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TeacherProfile = () => {
  const [loading, setLoading] = useState(true);
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [searchIndex, setSearchIndex] = useState(-1);

  useEffect(() => {
    const fetchTeacherClasses = async () => {
      let teacherId = JSON.parse(localStorage.getItem("attendencetoken"))?.id;
      try {
        const response = await fetch(
          `http://localhost:4000/classes?teacher=${teacherId}`
        );
        const result = await response.json();
        setTeacherClasses(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching teacher classes:", error);
        setLoading(false);
      }
    };
    setTimeout(() => {
      fetchTeacherClasses();
    }, 1000);
  }, []);

  const handleChange = (value) => {
    const searchText = value.toLowerCase();
    const elements = document.querySelectorAll("td");
    let found = false;
    elements.forEach((element, index) => {
      if (
        searchText !== "" &&
        element.textContent.toLowerCase().includes(searchText)
      ) {
        if (!found) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          setSearchIndex(index);
          found = true;
        }
        element.style.backgroundColor = "rgb(0, 255, 162)";
      } else {
        element.style.color = "";
        element.style.backgroundColor = "";
      }
    });
    // setInstitutes(allInstitutes.filter(inst => inst.name.toLowerCase().includes(value.toLowerCase())));
  };

  const renderTeacherClasses = () => (
    <div id="teacherProfile" className="classes">
      <div
        style={{
          width: "100%",
          display: "flex",
          margin: "-20px 0 10px 0",
          justifyContent: "center",
        }}
      >
        <input
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            border: "none",
            boxShadow: "0 0 5px white",
          }}
          type="text"
          placeholder="Search for anything"
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      {Object.keys(teacherClasses).map((key) => {
        const cls = teacherClasses[key];
        return (
          <div key={cls.id}>
            <Link className="class-card" href={`/class/${cls.id}`}>
              <table>
                <tbody>
                  <tr>
                    <td>Department</td>
                    <td>
                      {
                        allDepartments.find((dept) => dept.id == cls.department)
                          ?.name
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Semester</td>
                    <td>{cls?.semester}</td>
                  </tr>
                  <tr>
                    <td>Shift</td>
                    <td>{cls?.shift}</td>
                  </tr>
                  <tr>
                    <td>Group</td>
                    <td>{cls?.group || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Subject</td>
                    <td>{cls?.subject}</td>
                  </tr>
                </tbody>
              </table>
            </Link>
          </div>
        );
      })}

      {teacherClasses.length == 0 && (
        <div
          style={{
            height: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ textAlign: "center" }}>No Class Added</h1>
        </div>
      )}
    </div>
  );

  return (
    <div className="classes-page">
      <h1>Your Classes</h1>
      {loading ? <Loading /> : <>{renderTeacherClasses()}</>}
      <div>
        <Link className="btn" href={`/classes/add-class`}>
          Add a Class
        </Link>
      </div>
    </div>
  );
};

export default TeacherProfile;
