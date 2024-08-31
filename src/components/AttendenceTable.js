"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import Loading from "./Loading";

const AttendenceTable = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const [classDetails, setClassDetails] = useState({});
  const [dropDown, setDropDown] = useState();
  const [addStudent, setAddStudent] = useState(false);
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
        const responseStudent = await fetch(
          `http://localhost:4000/students?classId=${params.class}`
        );
        const resultStudent = await responseStudent.json();
        const dateheadResponse = await fetch(
          `http://localhost:4000/dates?classId=${params.class}`
        );
        const dateheadResult = await dateheadResponse.json();
        const attendResponse = await fetch(
          `http://localhost:4000/attendence?classId=${params.class}`
        );
        const attendResult = await attendResponse.json();

        setClassDetails({
          group: result.group,
          cell: result.cell,
          students: resultStudent,
          dates: dateheadResult,
          attendence: attendResult,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };
    setTimeout(() => {
      loadClassDetails();
    }, 1000);
  }, [params.class]);

  useEffect(() => {
    setFormData({
      fullname: "",
      roll: "",
      email: "",
      phone: "",
    });
  }, [addStudent]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (classId) => {
    if (formData.fullname == "") {
      localStorage.setItem(
        "toast",
        JSON.stringify({ type: "error", message: `Please enter a name!` })
      );
      // setTimeout(() => {
      //   localStorage.removeItem("toast");
      // }, 3000);

      return;
    } else if (formData.roll == "") {
      localStorage.setItem(
        "toast",
        JSON.stringify({
          type: "error",
          message: `Please enter a roll number!`,
        })
      );
      // setTimeout(() => {
      //   localStorage.removeItem("toast");
      // }, 3000);

      return;
    }

    const studentData = {
      ...formData,
      createdAt: new Date(),
      updatedAt: new Date(),
      classId: classId,
    };

    let exists = await fetch(
      `http://localhost:4000/students?roll=${formData.roll}&classId=${classId}`
    );
    exists = await exists.json();
    if (exists[0]) {
      localStorage.setItem(
        "toast",
        JSON.stringify({
          type: "error",
          message: `Student with roll number "${formData.roll}" already exists!`,
        })
      );
      // setTimeout(() => {
      //   localStorage.removeItem("toast");
      // }, 3000);

      return;
    }

    try {
      const response = await fetch("http://localhost:4000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      const result = await response.json();
      let updatedStudents = classDetails.students;
      updatedStudents.push(result);
      setClassDetails({ ...classDetails, students: updatedStudents });

      localStorage.setItem(
        "toast",
        JSON.stringify({
          type: "success",
          message: `Student "${studentData.fullname}" has been added successfully!`,
        })
      );
      // setTimeout(() => {
      //   localStorage.removeItem("toast");
      // }, 3000);

      setFormData({
        fullname: "",
        roll: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleAddDate = async (date, classNumber, classId, id = null) => {
    let currentClass = params.class;
    let formData;

    if (id) {
      formData = {
        date: date,
        updatedAt: new Date(),
      };
      let con = confirm("Are you sure you want to change Date?");
      if (!con) {
        return;
      }
    } else {
      formData = {
        date: date,
        classId: currentClass,
        classNumber: classNumber,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    let link;
    id
      ? (link = `http://localhost:4000/dates/${id}`)
      : (link = "http://localhost:4000/dates");
    await fetch(link, {
      method: id ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const dateheadResponse = await fetch(
      `http://localhost:4000/dates?classId=${classId}`
    );
    const dateheadResult = await dateheadResponse.json();
    setClassDetails({
      ...classDetails,
      dates: dateheadResult,
    });
    if (id) {
      localStorage.setItem(
        "toast",
        JSON.stringify({
          type: "success",
          message: `Date has been changed`,
        })
      ); 
    }else {
      localStorage.setItem(
        "toast",
        JSON.stringify({
          type: "success",
          message: `Date has been added`,
        })
      );
    }
  };

  const removeDate = async (id, classId, classNumber) => {
    console.log(classId, classNumber)
    let exists = await fetch(`http://localhost:4000/attendence?classId=${classId}&classNumber=${classNumber}`);
    exists = await exists.json();

    if (exists[0]) {
      localStorage.setItem(
        "toast",
        JSON.stringify({
          type: "warning",
          message: `You can not remove the date`,
        })
      );
      return
    }
    let con = confirm("Are you sure you want to reset Date?");
    if (!con) {
      return;
    }
    await fetch(`http://localhost:4000/dates/${id}`, {
      method: "DELETE",
    });

    const dateheadResponse = await fetch(
      `http://localhost:4000/dates?classId=${classId}`
    );
    const dateheadResult = await dateheadResponse.json();
    setClassDetails({
      ...classDetails,
      dates: dateheadResult,
    });
    localStorage.setItem(
      "toast",
      JSON.stringify({
        type: "info",
        message: `Date has been removed`,
      })
    );
    return;
  };

  const handleAttendence = async (status, studentId, classNumber, classId) => {
    let formData = {
      status,
      classId,
      studentId,
      classNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
      time: "On Time",
    };

    let exists = await fetch(
      `http://localhost:4000/dates?classId=${classId}&classNumber=${classNumber}`
    );
    exists = await exists.json();
    if (!exists[0]) {
      localStorage.setItem(
        "toast",
        JSON.stringify({
          type: "warning",
          message: `Assigned a date for this class!`,
        })
      );
      return;
    }

    await fetch(`http://localhost:4000/attendence`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const attendResponse = await fetch(
      `http://localhost:4000/attendence?classId=${classId}`
    );
    const attendResult = await attendResponse.json();
    setClassDetails({
      ...classDetails,
      attendence: attendResult,
    });
  };

  const handleTime = async (id, time, classId) => {
    let formData = {
      updatedAt: new Date(),
      time: time,
    };

    await fetch(`http://localhost:4000/attendence/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const attendResponse = await fetch(
      `http://localhost:4000/attendence?classId=${classId}`
    );
    const attendResult = await attendResponse.json();
    setClassDetails({
      ...classDetails,
      attendence: attendResult,
    });
    setDropDown();
  };

  const removeAttendence = async (id, classId) => {
    let con = confirm("Are you sure you want to remove attendence?");
    if (!con) {
      return;
    }
    await fetch(`http://localhost:4000/attendence/${id}`, {
      method: "DELETE",
    });

    const attendResponse = await fetch(
      `http://localhost:4000/attendence?classId=${classId}`,
      {
        method: "GET",
      }
    );
    const attendResult = await attendResponse.json();
    setClassDetails({
      ...classDetails,
      attendence: attendResult,
    });
  };

  const handleCell = async (number, classId) => {
    let classData = {
      cell: classDetails?.cell + number,
    };
    const response = await fetch(`http://localhost:4000/classes/${classId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classData),
    });
    localStorage.setItem(
      "toast",
      JSON.stringify({
        type: "success",
        message: `${number} cell added`,
      })
    );

    const result = await response.json();
    setClassDetails({
      ...classDetails,
      cell: result.cell,
    });
  };

  return (
    <div className="table-container">
      {loading ? (
        <Loading />
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th className="fixed-roll">Roll</th>
                <th className="fixed-name">Student Name</th>
                {Array.from({ length: classDetails?.cell }, (_, i) => {
                  const matchedDate = classDetails?.dates?.find(
                    (date) => date.classNumber === i + 1
                  );
                  return (
                    <th key={i}>
                      {matchedDate?.date && (
                        <button
                          className="cross cross-date"
                          onClick={() =>
                            removeDate(matchedDate?.id, params.class, i+1)
                          }
                        >
                          <FaTrashAlt />
                        </button>
                      )}
                      <Flatpickr
                        data-enable-time
                        value={matchedDate?.date || ""}
                        onChange={(selectedDates) => {
                          handleAddDate(
                            selectedDates[0],
                            i + 1,
                            params.class,
                            matchedDate?.id
                          );
                        }}
                        options={{
                          dateFormat: "d-m-Y",
                          enableTime: false, // Enables time selection
                          // You can add more Flatpickr options here
                        }}
                        placeholder="Pick a date"
                      />
                    </th>
                  );
                })}
                <th className="add-cell">
                  Add more
                  <span onClick={() => handleCell(1, params.class)}>1</span>
                  <span onClick={() => handleCell(5, params.class)}>5</span>
                  <span onClick={() => handleCell(10, params.class)}>10</span>
                  <span onClick={() => handleCell(20, params.class)}>20</span>
                  <span onClick={() => handleCell(30, params.class)}>
                    30
                  </span>{" "}
                  cell
                </th>
              </tr>
            </thead>
            <tbody>
              {classDetails?.students
                ?.sort((a, b) => a.roll - b.roll)
                ?.map((student) => (
                  <tr key={student.id}>
                    <td className="fixed-roll">
                      <Link
                        className="student-link"
                        href={`/class/${params.class}/${student.id}`}
                      >
                        {student.roll}
                      </Link>
                    </td>
                    <td className="fixed-name">
                      <Link
                        className="student-link"
                        href={`/class/${params.class}/${student.id}`}
                      >
                        {student.fullname}
                      </Link>
                    </td>
                    {Array.from({ length: classDetails?.cell }, (_, i) => {
                      const matchedAttend = classDetails?.attendence?.find(
                        (attend) =>
                          attend.studentId === student.id &&
                          attend.classNumber === i + 1
                      );
                      return (
                        <td
                          className="attend-td"
                          key={i}
                          style={{
                            background:
                              matchedAttend?.status == "P"
                                ? "#b1ffb1"
                                : matchedAttend?.status == "A"
                                ? "#ffb1b1"
                                : null,
                          }}
                        >
                          {matchedAttend ? (
                            <>
                              <span>{matchedAttend.status}</span>
                              <span className="time">
                                {matchedAttend.status == "P" &&
                                  matchedAttend.time}
                              </span>
                              <button
                                className="cross"
                                onClick={() =>
                                  removeAttendence(
                                    matchedAttend.id,
                                    params.class
                                  )
                                }
                              >
                                <FaTrashAlt />
                              </button>
                              {matchedAttend.status == "P" && (
                                <button
                                  className="menu"
                                  onClick={() =>
                                    setDropDown((dropDown) =>
                                      dropDown ? 0 : matchedAttend.id
                                    )
                                  }
                                >
                                  {dropDown && dropDown == matchedAttend.id ? (
                                    <RxCross2 />
                                  ) : (
                                    <BsThreeDots />
                                  )}
                                </button>
                              )}

                              {dropDown == matchedAttend.id && (
                                <div className="menus">
                                  <button
                                    style={{
                                      background:
                                        matchedAttend.time == "On Time" &&
                                        "#33ff00",
                                      color:
                                        matchedAttend.time == "On Time" &&
                                        "black",
                                      opacity:
                                        matchedAttend.time == "On Time" && "1",
                                    }}
                                    onClick={() =>
                                      handleTime(
                                        matchedAttend.id,
                                        "On Time",
                                        params.class
                                      )
                                    }
                                  >
                                    On Time
                                  </button>
                                  <button
                                    style={{
                                      background:
                                        matchedAttend.time == "Late Entry" &&
                                        "#33ff00",
                                      color:
                                        matchedAttend.time == "Late Entry" &&
                                        "black",
                                      opacity:
                                        matchedAttend.time == "Late Entry" &&
                                        "1",
                                    }}
                                    onClick={() =>
                                      handleTime(
                                        matchedAttend.id,
                                        "Late Entry",
                                        params.class
                                      )
                                    }
                                  >
                                    Late Entry
                                  </button>
                                  <button
                                    style={{
                                      background:
                                        matchedAttend.time == "Early Exit" &&
                                        "#33ff00",
                                      color:
                                        matchedAttend.time == "Early Exit" &&
                                        "black",
                                      opacity:
                                        matchedAttend.time == "Early Exit" &&
                                        "1",
                                    }}
                                    onClick={() =>
                                      handleTime(
                                        matchedAttend.id,
                                        "Early Exit",
                                        params.class
                                      )
                                    }
                                  >
                                    Early Exit
                                  </button>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              <button
                                style={{ background: "#61ff61" }}
                                onClick={() =>
                                  handleAttendence(
                                    "P",
                                    student.id,
                                    i + 1,
                                    params.class
                                  )
                                }
                                className="p-a-button"
                              >
                                P
                              </button>
                              <button
                                style={{
                                  background: "#ff4141",
                                  color: "white",
                                }}
                                onClick={() =>
                                  handleAttendence(
                                    "A",
                                    student.id,
                                    i + 1,
                                    params.class
                                  )
                                }
                                className="p-a-button"
                              >
                                A
                              </button>
                            </>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              {addStudent && (
                <tr className="add-student">
                  <td>
                    <input
                      type="text"
                      id="roll"
                      name="roll"
                      value={formData.roll}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter roll"
                      style={{ width: "100%", minWidth: "75px" }}
                      autocomplete="off"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter name"
                      autocomplete="off"
                    />
                  </td>
                  <td colSpan={2}>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email (optional)"
                      autocomplete="off"
                    />
                  </td>
                  <td colSpan={2}>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone (optional)"
                      autocomplete="off"
                    />
                  </td>
                  <td>
                    <button
                      style={{ background: "#61ff61" }}
                      onClick={() => handleSubmit(params.class)}
                    >
                      Add
                    </button>
                  </td>
                  <td></td>
                  <td>
                    <button
                      style={{ background: "#ff4141", color: "white" }}
                      onClick={() => setAddStudent(false)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              )}
              {!addStudent && (
                <tr style={{ background: "white" }}>
                  <td
                    style={{
                      // position: "sticky",
                      // left: "2px",
                      padding: "0",
                    }}
                    colSpan={2}
                  >
                    <button
                      className="btn add-student-btn"
                      onClick={() => setAddStudent(true)}
                    >
                      Add Student
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {classDetails?.students == 0 && (
            <div
              style={{
                height: "50vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1 style={{ textAlign: "center" }}>No Students</h1>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AttendenceTable;