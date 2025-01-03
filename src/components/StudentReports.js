'use client'
import React, { useEffect, useState } from "react";

const StudentReports = ({params}) => {
  const [classDetails, setClassDetails] = useState({});

  useEffect(() => {
    const loadClassDetails = async () => {
      try {
        const attendenceResponse = await fetch(
          `http://localhost:4000/attendence?studentId=${params.student}&classId=${params.class}`, { cache: "no-store"}
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
          attendence: attendenceDetails,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    loadClassDetails();
  }, [params.class]);
  return (
    <div className="class-details">
      <h2 style={{ marginTop: "10px" }}>Attendance Details</h2>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          margin: "20px 0",
          gap: "20px",
        }}
      >
        <p style={{width: "max-content"}}>Total Classes: {classDetails?.attendence?.total}</p>
        <p style={{width: "max-content"}}>Present: {classDetails?.attendence?.present}</p>
        <p style={{width: "max-content"}}>Absent: {classDetails?.attendence?.absent}</p>
        <p style={{width: "max-content"}}>Late Entries: {classDetails?.attendence?.late}</p>
        <p style={{width: "max-content"}}>Early Exits: {classDetails?.attendence?.early}</p>
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
  );
};

export default StudentReports;
