"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const OwnerProfile = ({ params }) => {
  const router = useRouter();
  useEffect(() => {
    let tokenString = localStorage.getItem("attendencetoken");
    let token;
    token = tokenString ? JSON.parse(tokenString) : null;
    if (token?.id != params.teacher) {
      router.push(`/${token.id}`, { scroll: false });
    }
  }, []);

  return <></>;
};

export default OwnerProfile;
