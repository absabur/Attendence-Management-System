"use client";
import LoginPage from "@/components/LoginPage";
import { allInstitutes } from "@/data/data";
import Link from "next/link";
import React, { useEffect, useState } from "react";



const Login = () => {
  const [institutes, setInstitutes] = useState([]);
  const [method, setMethod] = useState(1);

  useEffect(() => {
    setInstitutes(allInstitutes);
  }, []);

  const handleChange = (value) => {
    setInstitutes(
      allInstitutes.filter((inst) =>
        inst.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="page">
      <h1>Log In</h1>
      <div className="methods">
        <div
          style={{ background: method == 1 && "#b1ffb1" }}
          onClick={() => setMethod(1)}
        >
          Method 1
        </div>
        <div
          style={{ background: method == 2 && "#b1ffb1" }}
          onClick={() => setMethod(2)}
        >
          Method 2
        </div>
      </div>
      {method == 1 ? (
        <div id="instituteList" className="links">
          <h2>Choose Your Institute</h2>
          <div
            style={{
              width: "100%",
              display: "flex",
              margin: "10px 0",
              justifyContent: "center",
            }}
          >
            <input
              style={{
                padding: "5px 10px",
                borderRadius: "5px",
                border: "none",
                boxShadow: "0 0 5px gray",
              }}
              type="text"
              placeholder="Search for institutes"
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
          {institutes.length === 0 && (
            <div
              style={{
                width: "100%",
                fontSize: "50px",
                textAlign: "center",
                margin: "40px 0",
                fontWeight: "600",
              }}
            >
              Loading...
            </div>
          )}
          {institutes.map((inst) => (
            <Link href={`/login/${inst.id}`} key={inst.id} className="link">
              {inst.name}
            </Link>
          ))}
          <p>
            Don't have an account? <Link href="/register">Register</Link>
          </p>
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default Login;
