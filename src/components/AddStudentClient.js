'use client'
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AddStudentClient = ({params}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullname: "",
    roll: "",
    email: "",
    phone: "",
  });


  useEffect(() => {
    const loadClassDetails = async () => {
      try {
        const studentResponse = await fetch(
          `http://localhost:4000/students?class=${params.class}&id=${params.student}`, { cache: "no-store"}
        );
        const studentResult = await studentResponse.json();
        setFormData(studentResult[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    loadClassDetails();
  }, [params.class]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = {
      ...formData,
      updatedAt: new Date(),
    };

    try {
      const response = await fetch(
        `http://localhost:4000/students/${params.student}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(studentData),
          cache: "no-store"
        }
      );

      await response.json();
      localStorage.setItem(
        "toast",
        JSON.stringify({
          type: "success",
          message: `Student "${studentData.fullname}" has been updated successfully!`,
        })
      );
      // setTimeout(() => {
      //   localStorage.removeItem("toast");
      // }, 3000);

      router.push(`/class/${params.class}/${params.student}`, {
        scroll: false,
      });
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };
  return (
    <form
      className="add-student-form"
      id="studentCreateFrom"
      onSubmit={handleSubmit}
    >
      <div>
        <label>Student&apos; Name:</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={formData.fullname}
          onChange={handleInputChange}
          required
          placeholder="Enter student name"
        />
      </div>
      <div>
        <label>Roll:</label>
        <input
          type="text"
          id="roll"
          name="roll"
          value={formData.roll}
          onChange={handleInputChange}
          required
          placeholder="Enter student roll"
        />
      </div>
      <div>
        <label>Email: (optional)</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter student email"
        />
      </div>
      <div>
        <label>Phone: (optional)</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Enter student phone"
        />
      </div>
      <div>
        <button className="btn" type="submit">
          Edit
        </button>
      </div>
    </form>
  );
};

export default AddStudentClient;
