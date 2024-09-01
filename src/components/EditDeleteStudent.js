'use client'
import { useRouter } from "next/navigation";
const EditDeleteStudent = ({ params }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      let con = confirm(`Are yor sure to remove student from this class?`);

      if (con) {
        const response = await fetch(
          `http://localhost:4000/students/${params.student}`,
          {
            method: "DELETE",
            cache: "no-store"
          }
        );

        await response.json();
        localStorage.setItem(
          "toast",
          JSON.stringify({
            type: "info",
            message: `The Student has been removed from this class`,
          })
        );

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
        router.push(`/class/${params.class}`, { scroll: false });
        return;
      }
      return;
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };
  return (
    <div className="edit-delete-btn">
      <button
        onClick={() =>
          router.push(`/class/${params.class}/${params.student}/edit`, {
            scroll: false,
          })
        }
      >
        Edit Student
      </button>
      <button onClick={handleDelete}>Remove Student</button>
    </div>
  );
};


export default EditDeleteStudent;