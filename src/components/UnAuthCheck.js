'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const UnAuthCheck = () => {
  const router = useRouter()
    useEffect(() => {
        let tokenString = localStorage.getItem("attendencetoken");
        let token;
    
        try {
          token = tokenString ? JSON.parse(tokenString) : null;
        } catch (error) {
          console.error("Invalid JSON in attendencetoken:", error);
          localStorage.removeItem("attendencetoken");
          return;
        }
        if (token) {
          const tokenCheck = async () => {
            try{
              const response = await fetch(
                `http://localhost:4000/teachers/${token.id}`, { cache: "no-store"}
              );
              const result = await response.json();
              if (
                result.fullname == token.name &&
                result.institute == token.institute &&
                result.department == token.department
              ) {
                router.push(`/${token.id}/classes`, { scroll: false });
              } else {
                localStorage.removeItem("attendencetoken");
              }
            }catch{
              localStorage.removeItem("attendencetoken");
            }
          };
          tokenCheck();
          return;
        }
      }, []);
  return (
    <></>
  )
}

export default UnAuthCheck