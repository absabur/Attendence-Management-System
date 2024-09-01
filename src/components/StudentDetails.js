'use client'

import { useEffect, useState } from "react";

const StudentDetails = ({params}) => {
    const [classDetails, setClassDetails] = useState({});

  useEffect(() => {
    const loadClassDetails = async () => {
      try {
        const studentResponse = await fetch(
          `http://localhost:4000/students?id=${params.student}&class=${params.class}`, { cache: "no-store"}
        );
        const studentResult = await studentResponse.json();

        setClassDetails({
          student: studentResult[0],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    loadClassDetails();
  }, [params.class]);
  return (
    <table>
      <tbody>
        <tr>
          <td>Student Name</td>
          <td>{classDetails?.student?.fullname || "Loading..."}</td>
        </tr>
        <tr>
          <td>Roll</td>
          <td>{classDetails?.student?.roll || "Loading..."}</td>
        </tr>
        {classDetails?.student?.email && (
          <tr>
            <td>Email</td>
            <td>{classDetails?.student?.email || "Loading..."}</td>
          </tr>
        )}
        {classDetails?.student?.phone && (
          <tr>
            <td>Phone</td>
            <td>{classDetails?.student?.phone || "Loading..."}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default StudentDetails;
