"use client";

import { useRouter } from "next/navigation";

const EditDelete = ({params}) => {
  const router = useRouter()
  const handleDelete = async (classId) => {
    try {
      let con = confirm(`Are yor sure to delete this class?`);

      if (con) {
        const response = await fetch(
          `http://localhost:4000/classes/${classId}`,
          {
            method: "DELETE",
            cache: "no-store"
          }
        );
        await response.json();

        const stuResponse = await fetch(
          `http://localhost:4000/students?classId=${classId}`, { cache: "no-store"}
        );

        const stuResult = await stuResponse.json();
        stuResult.forEach((attend) => {
          fetch(`http://localhost:4000/students/${attend.id}`, {
            method: "DELETE",
            cache: "no-store",
          });
        });

        const dateResponse = await fetch(
          `http://localhost:4000/dates?classId=${classId}`, { cache: "no-store"}
        );

        const dateResult = await dateResponse.json();
        dateResult.forEach((attend) => {
          fetch(`http://localhost:4000/students/${attend.id}`, {
            method: "DELETE",
            cache: "no-store",
          });
        });
        localStorage.setItem(
          "toast",
          JSON.stringify({
            type: "info",
            message: `Class has been deleted successfully`,
          })
        );
        let id = JSON.parse(localStorage.getItem("attendencetoken")).id
        const teacherRes = await fetch(
          `http://localhost:4000/teachers/${id}`,
          { cache: 'no-store' }
        );
        const result = await teacherRes.json();
        router.push(`/${result.id}/classes`, { scroll: false });
        return;
      }
      return;
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };
  return (
    <div className="buttons">
      <button
        onClick={() => router.push(`/class/${params.class}/edit`, { scroll: false })}
      >
        Edit Class
      </button>
      <button onClick={() => handleDelete(params.class)}>Delete Class</button>
    </div>
  );
};

export default EditDelete;
