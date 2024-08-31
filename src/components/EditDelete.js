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
          }
        );
        await response.json();

        const stuResponse = await fetch(
          `http://localhost:4000/students?classId=${classId}`
        );

        const stuResult = await stuResponse.json();
        stuResult.forEach((attend) => {
          fetch(`http://localhost:4000/students/${attend.id}`, {
            method: "DELETE",
          });
        });

        const dateResponse = await fetch(
          `http://localhost:4000/dates?classId=${classId}`
        );

        const dateResult = await dateResponse.json();
        dateResult.forEach((attend) => {
          fetch(`http://localhost:4000/students/${attend.id}`, {
            method: "DELETE",
          });
        });
        localStorage.setItem(
          "toast",
          JSON.stringify({
            type: "info",
            message: `Class has been deleted successfully`,
          })
        );
        router.push("/classes", { scroll: false });
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
