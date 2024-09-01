import Link from "next/link";
import "./addStudent.css";
import ClassDetails from "@/components/ClassDetails";
import AddStudentClient from "@/components/AddStudentClient";

const AddStudent = ({ params }) => {
  return (
    <div className="add-student-page">
      <h2 style={{margin: "20px 0 10px 0"}}>Class Details</h2>
      <ClassDetails params={params} />
      <h1 style={{ marginTop: "20px" }}>Update student</h1>
      <AddStudentClient params={params} />
      <Link className="btn" href={`/class/${params.class}/${params.student}`}>
        Return to student profile
      </Link>
    </div>
  );
};

export default AddStudent;

// export async function generateStaticParams() {
//   const classes = await fetch("http://localhost:4000/classes", { cache: "no-store"});
//   const classesJson = await classes.json();

//   const students = await fetch("http://localhost:4000/students", { cache: "no-store"});
//   const studentsJson = await students.json();

//   const params = [];

//   classesJson.forEach((classItem) => {
//     studentsJson.forEach((student) => {
//       params.push({
//         class: classItem.id,
//         student: student.id,
//       });
//     });
//   });

//   return params;
// }
// export const revalidate = 5;

export async function generateStaticParams() {
  return []; // Return an empty array to handle the route dynamically.
}
