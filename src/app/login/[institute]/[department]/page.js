import { allDepartments, allInstitutes } from "@/data/data";
import Link from "next/link";

const Teachers = async ({ params }) => {
  const institute = params.institute;
  const department = params.department;
  const response = await fetch(
    `http://localhost:4000/teachers?department=${department}&institute=${institute}`,
    { cache: "no-store" }
  );

  const result = await response.json();

  let teachers = result;

  return (
    <div className="page">
      <h1>Log In</h1>
      <div id="teacherList" className="links">
        <h2>Choose your name</h2>
        {teachers.map((teacher) => (
          <Link
            href={`/login/${params.institute}/${params.department}/${teacher.id}`}
            key={teacher.id}
            className="link"
          >
            {teacher.fullname}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Teachers;

// export async function generateStaticParams() {
//   const params = [];

//   allInstitutes.forEach((institute) => {
//     allDepartments.forEach((department) => {
//       params.push({
//         institute: institute.id,
//         department: department.id,
//       });
//     });
//   });

//   return params;
// }
// export const revalidate = 5;

export async function generateStaticParams() {
  return []; // Return an empty array to handle the route dynamically.
}

