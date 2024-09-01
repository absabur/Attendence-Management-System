"use client";
import SearchClasses from "@/components/SearchClasses";
import { allDepartments } from "@/data/data";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const GetClasses = ({ params }) => {
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  let teacherId = params.teacher;
  useEffect(() => {
    const get = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/classes?teacher=${teacherId}`,
          { cache: "no-store" }
        );
        const result = await response.json();
        setTeacherClasses(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching teacher classes:", error);
        setLoading(false);
      }
    };
    get();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div id="teacherProfile" className="classes">
          <SearchClasses element={"td"} />
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
                            allDepartments.find(
                              (dept) => dept.id == cls.department
                            )?.name
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
      )}
    </>
  );
};

export default GetClasses;
