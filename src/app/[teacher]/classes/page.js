import GetClasses from "@/components/GetClasses";
import Link from "next/link";

const TeacherProfile = async ({params}) => {
  
  let teacherId = params.teacher;

  return (
    <div className="classes-page">
      <h1>Your Classes</h1>
      <GetClasses params={params} />
      <div>
        <Link className="btn" href={`/${teacherId}/classes/add-class`}>
          Add a Class
        </Link>
      </div>
    </div>
  );
};

export default TeacherProfile;


// export async function generateStaticParams() {
//   const teachers = await fetch("http://localhost:4000/teachers", { cache: "no-store"});
//   const teachersJson = await teachers.json();
//   return teachersJson.map((teacher) => ({
//     teacher: teacher.id,
//   }));
// }
// export const revalidate = 5;


export async function generateStaticParams() {
  return []; // Return an empty array to handle the route dynamically.
}
