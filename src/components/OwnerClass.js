"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const OwnerClass = ({ params }) => {
  const router = useRouter();
  useEffect(() => {
    let tokenString = localStorage.getItem("attendencetoken");
    let token;
    token = tokenString ? JSON.parse(tokenString) : null;
    if (token) {
      const classCheck = async () => {
        const response = await fetch(
          `http://localhost:4000/classes?id=${params.class}&teacher=${token.id}`, { cache: "no-store"}
        );
        const result = await response.json();
        if (result.length == 0) {
          localStorage.setItem(
            "toast",
            JSON.stringify({
              type: "warning",
              message: `You Can't access this class.`,
            })
          );
          // setTimeout(() => {
          //   localStorage.removeItem("toast");
          // }, 3000);

          router.push(`/${token.id}/classes`, { scroll: false });
        }
      };
      classCheck();
    }
  }, []);

  return <></>;
};

export default OwnerClass;
