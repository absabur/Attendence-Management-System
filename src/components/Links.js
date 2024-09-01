"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Links = () => {
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
    const fetchTeacherDetails = async () => {
      const token = JSON.parse(localStorage.getItem("attendencetoken"));
      if (token) {
        const teacherId = token.id;
        try {
          const response = await fetch(
            `http://localhost:4000/teachers/${teacherId}`, { cache: "no-store"}
          );
          const result = await response.json();
          setTeacherDetails(result);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching teacher details:", error);
          setTeacherDetails(null);
          setLoading(false);
        }
      } else {
        setTeacherDetails(null);
        setLoading(false);
      }
      const attendResponse = await fetch(
        `http://localhost:4000/attendence?studentId=${null}`, { cache: "no-store"}
      );
      const attendResult = await attendResponse.json();
      attendResult.forEach((attend) => {
        fetch(`http://localhost:4000/attendence/${attend.id}`, {
          method: "DELETE",
          cache: "no-store"
        });
      });

      const dateResponse = await fetch(
        `http://localhost:4000/dates?classId=${null}`, { cache: "no-store"}
      );
      const dateResult = await dateResponse.json();
      dateResult.forEach((attend) => {
        fetch(`http://localhost:4000/dates/${attend.id}`, {
          method: "DELETE",
          cache: "no-store"
        });
      });
    };

    fetchTeacherDetails();
  }, [pathname]);

  return (
    <>
      {!loading && (
        <>
          {teacherDetails ? (
            <div>
              <Link className="nav-name" href={`/${teacherDetails.id}/classes`}>
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
      )}
    </>
  );
};

export default Links;
