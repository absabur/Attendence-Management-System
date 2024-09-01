"use client";

import { allDepartments } from "@/data/data";
import { useEffect, useState } from "react";

const ClassDetails = ({ params }) => {
  const [classDetails, setClassDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:4000/classes/${params.class}`,
        { cache: "no-store" }
      );
      const result = await response.json();

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
        group: result.group,
        department: department,
      });
    };
    fetchData();
  }, []);

  return (
    <div>
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
  );
};

export default ClassDetails;
