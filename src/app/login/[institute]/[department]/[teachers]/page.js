import Login from "@/components/Login";
import "./pass.css";
import { allDepartments, allInstitutes } from "@/data/data";

const PasswordPage = async ({ params }) => {
  let dept = allDepartments.find((dept) => dept.id === params.department);
  let inst = allInstitutes.find((inst) => inst.id === params.institute);
  let teacher = await fetch(
    `http://localhost:4000/teachers/${params.teachers}`,
    { cache: "no-store" }
  );
  teacher = await teacher.json();

  return (
    <div className="password-page">
      <h1>Log In</h1>
      <div id="selectedPath" className="selectedPath">
        <div>Institute: {dept.name}</div>
        <div>Department: {inst.name}</div>
        <div>Teacher Name: {teacher.fullname}</div>
      </div>
      <Login params={params} />
    </div>
  );
};

export default PasswordPage;

// export async function generateStaticParams() {
//   const teachers = await fetch("http://localhost:4000/teachers", {
//     cache: "no-store",
//   });
//   const teachersData = await teachers.json();

//   const params = [];

//   allInstitutes.forEach((institute) => {
//     allDepartments.forEach((department) => {
//       teachersData.forEach((teacher) => {
//         params.push({
//           institute: institute.id,
//           department: department.id,
//           teachers: teacher.id,
//         });
//       });
//     });
//   });

//   return params;
// }
// export const revalidate = 5;


export async function generateStaticParams() {
  return []; // Return an empty array to handle the route dynamically.
}
