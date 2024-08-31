"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const OwnerStudent = ({ params }) => {
  const router = useRouter();
  useEffect(() => {
    let tokenString = localStorage.getItem("attendencetoken");
    let token;
    token = tokenString ? JSON.parse(tokenString) : null;
    if (token) {
      const classCheck = async () => {
        const stuResponse = await fetch(
          `http://localhost:4000/students?classId=${params.class}&id=${params.student}`
        );
        const stuResult = await stuResponse.json();
        if (stuResult.length == 0) {
          localStorage.setItem(
            "toast",
            JSON.stringify({
              type: "warning",
              message: `You Can't access this student.`,
            })
          );
          // setTimeout(() => {
          //   localStorage.removeItem("toast");
          // }, 3000);
          router.push(`/class/${params.class}`, { scroll: false });
        }
      };
      classCheck();
    }
  }, []);

  return <></>;
};

export default OwnerStudent;
