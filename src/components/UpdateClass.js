"use client";
import { allDepartments, allInstitutes } from "@/data/data";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

const UpdateClass = ({params}) => {
  const [departments] = useState(allDepartments);

  const router = useRouter();

  const [formData, setFormData] = useState({
    department: "",
    semester: "",
    shift: "",
    subject: "",
    group: "",
  });

  useEffect(() => {
    const loadClassDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/classes/${params.class}`, { cache: "no-store"}
        );
        const result = await response.json();
        setFormData(result);
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

    const classData = {
      ...formData,
      updatedAt: new Date(),
    };

    try {
      const response = await fetch(
        `http://localhost:4000/classes/${params.class}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(classData),
          cache: "no-store"
        }
      );

      await response.json();
      localStorage.setItem(
        "toast",
        JSON.stringify({
          type: "success",
          message: "Class has been updated successfully!",
        })
      );
      // setTimeout(() => {
      //   localStorage.removeItem("toast")
      // }, 3000);
      router.push(`/class/${params.class}`, { scroll: false });
    } catch (error) {
      console.error("Error adding class:", error);
    }
  };
  return (
    <form className="add-class-form" onSubmit={handleSubmit}>
      <div>
        <label>Institute of Class:</label>
        <select
          id="instituteselect"
          name="institute"
          value={formData.institute}
          onChange={handleInputChange}
          required
        >
          <option value="">Choose</option>
          {allInstitutes.map((institute) => (
            <option key={institute.id} value={institute.id}>
              {institute.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Department of Class:</label>
        <select
          id="departmentSelect"
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          required
        >
          <option value="">Choose</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Semester of Class:</label>
        <select
          id="semesterSelect"
          name="semester"
          value={formData.semester}
          onChange={handleInputChange}
          required
        >
          <option value="">Choose</option>
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
          <option value="3rd">3rd</option>
          <option value="4th">4th</option>
          <option value="5th">5th</option>
          <option value="6th">6th</option>
          <option value="7th">7th</option>
        </select>
      </div>
      <div>
        <label>Shift of Class:</label>
        <select
          id="shiftSelect"
          name="shift"
          value={formData.shift}
          onChange={handleInputChange}
          required
        >
          <option value="">Choose</option>
          <option value="First">First</option>
          <option value="Second">Second</option>
        </select>
      </div>
      <div>
        <label>Group Name:</label>
        <input
          type="text"
          id="group"
          name="group"
          value={formData.group}
          onChange={handleInputChange}
          placeholder="Enter group"
        />
      </div>
      <div>
        <label>Subject Name:</label>
        <input
          type="text"
          id="subjectName"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          required
          placeholder="Enter subject name"
        />
      </div>
      <div>
        <button className="btn" type="submit">
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateClass;
