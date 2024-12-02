import "./student.css";
import Link from "next/link";
import OwnerStudent from "@/components/OwnerStudent";
import ClassDetails from "@/components/ClassDetails";
import StudentDetails from "@/components/StudentDetails";
import EditDeleteStudent from "@/components/EditDeleteStudent";
import StudentReports from "@/components/StudentReports";

const Page = ({ params }) => {


  return (
    <div className="class-page">
      <OwnerStudent params={params} />
      <div className="class-details">
        <h2>Class and Student Details</h2>
        <div className="details">
          <ClassDetails params={params} />
          <div>
            <StudentDetails params={params} />
            <EditDeleteStudent params={params} />
          </div>
        </div>
        <Link className="btn" href={`/class/${params.class}/`}>
          Return to Class
        </Link>
      </div>
      <StudentReports params={params} />
    </div>
  );
};

export default Page;

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



