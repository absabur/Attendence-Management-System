"use client";
import { allDepartments } from "@/data/data";
import React, { useEffect, useState } from "react";

import "./student.css";
import Link from "next/link";
import OwnerStudent from "@/components/OwnerStudent";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const [classDetails, setClassDetails] = useState({});
  const router = useRouter()

  useEffect(() => {
    const loadClassDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/classes/${params.class}`
        );
        const result = await response.json();

        let department = null;
        allDepartments.forEach((dept) => {
          if (dept.id == result.department) {
            department = dept.name;
          }
        });

        const studentResponse = await fetch(
          `http://localhost:4000/students?id=${params.student}&class=${params.class}`
        );
        const studentResult = await studentResponse.json();

        const attendenceResponse = await fetch(
          `http://localhost:4000/attendence?studentId=${params.student}&classId=${params.class}`
        );
        const attendenceResult = await attendenceResponse.json();

        let attendenceDetails = {
          present: 0,
          absent: 0,
          late: 0,
          total: 0,
          early: 0,
          percentage: 0,
          absentPercentage: 0,
          latePercentage: 0,
          earlyPercentage: 0,
        };

        for (let attend of attendenceResult) {
          attendenceDetails.total++;
          if (attend.status == "P") {
            attendenceDetails.present++;
          } else if (attend.status == "A") {
            attendenceDetails.absent++;
          }
          if (attend.time == "Late Entry") {
            attendenceDetails.late++;
          } else if (attend.time == "Early Exit") {
            attendenceDetails.early++;
          }
          attendenceDetails.percentage =
            (attendenceDetails.present * 100) / attendenceDetails.total;
          attendenceDetails.latePercentage =
            (attendenceDetails.late * 100) / attendenceDetails.present;
          attendenceDetails.earlyPercentage =
            (attendenceDetails.early * 100) / attendenceDetails.present;
          attendenceDetails.absentPercentage =
            100 - attendenceDetails.percentage;

          if (attendenceDetails.late == "0") {
            attendenceDetails.latePercentage = 0;
          }
          if (attendenceDetails.early == "0") {
            attendenceDetails.earlyPercentage = 0;
          }
        }

        setClassDetails({
          shift: result.shift,
          semester: result.semester,
          subject: result.subject,
          department: department,
          group: result.group,
          student: studentResult[0],
          attendence: attendenceDetails,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    loadClassDetails();
  }, [params.class]);

  const handleDelete = async () => {
    try {
      let con = confirm(
        `Are yor sure to delete ${classDetails?.student?.fullname} from this class?`
      );

      if (con) {
        const response = await fetch(
          `http://localhost:4000/students/${params.student}`,
          {
            method: "DELETE",
          }
        );

        await response.json();
        localStorage.setItem(
          "toast",
          JSON.stringify({
            type: "info",
            message: `"${classDetails?.student?.fullname}" has been removed from this class`,
          })
        );

        const attendResponse = await fetch(
          `http://localhost:4000/attendence?studentId=${null}`
        );

        const attendResult = await attendResponse.json();
        attendResult.forEach((attend) => {
          fetch(`http://localhost:4000/attendence/${attend.id}`, {
            method: "DELETE",
          });
        });
        router.push(`/class/${params.class}`, { scroll: false });
        return;
      }
      return;
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="class-page">
      <OwnerStudent params={params} />
      <div className="class-details">
        <h2>Class and Student Details</h2>
        <div className="details">
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
          <div>
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
            <div className="edit-delete-btn">
              <button
                onClick={() =>
                  (router.push(`/class/${params.class}/${params.student}/edit`, { scroll: false }))
                }
              >
                Edit Student
              </button>
              <button onClick={handleDelete}>Remove Student</button>
            </div>
          </div>
        </div>
        <Link className="btn" href={`/class/${params.class}/`}>
          Return to Class
        </Link>
      </div>
      <div className="class-details">
        <h2 style={{ marginTop: "10px" }}>Attendance Details</h2>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            margin: "20px 0",
          }}
        >
          <p>Total Classes: {classDetails?.attendence?.total}</p>
          <p>Present: {classDetails?.attendence?.present}</p>
          <p>Absent: {classDetails?.attendence?.absent}</p>
          <p>Late Entries: {classDetails?.attendence?.late}</p>
          <p>Early Exits: {classDetails?.attendence?.early}</p>
        </div>
        <div className="charts">
          <div className="percentage">
            <div
              className="outside"
              style={{
                background: `conic-gradient(green ${classDetails?.attendence?.percentage}%, black ${classDetails?.attendence?.percentage}% 100%)`,
              }}
            >
              <div className="inside">
                {classDetails?.attendence?.percentage.toFixed(2)}%
              </div>
            </div>
            <p>Percentage of Presentees</p>
          </div>

          <div className="percentage">
            <div
              className="outside"
              style={{
                background: `conic-gradient(red ${classDetails?.attendence?.latePercentage}%, black ${classDetails?.attendence?.latePercentage}% 100%)`,
              }}
            >
              <div className="inside">
                {classDetails?.attendence?.latePercentage.toFixed(2)}%
              </div>
            </div>
            <p>Percentage of Late Entries</p>
          </div>

          <div className="percentage">
            <div
              className="outside"
              style={{
                background: `conic-gradient(blue ${classDetails?.attendence?.earlyPercentage}%, black ${classDetails?.attendence?.earlyPercentage}% 100%)`,
              }}
            >
              <div className="inside">
                {classDetails?.attendence?.earlyPercentage.toFixed(2)}%
              </div>
            </div>
            <p>Percentage of Early Exits</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
