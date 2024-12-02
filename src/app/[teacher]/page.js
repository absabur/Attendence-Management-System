import Link from "next/link";

import "./register.css";
import UpgradeTeacher from "@/components/UpgradeTeacher";

const TeacherForm = ({params}) => {
  return (
    <div className="register-page">
      <h1>Update Profile</h1>
      <UpgradeTeacher />
      <Link className="btn" href={`/${params.teacher}/classes`}>
        Return to classes
      </Link>
    </div>
  );
};

export default TeacherForm;

// export async function generateStaticParams() {
//   const teachers = await fetch("http://localhost:4000/teachers", { cache: "no-store"});
//   const teachersJson = await teachers.json();
//   return teachersJson.map((teacher) => ({
//     teacher: teacher.id,
//   }));
// }
// export const revalidate = 5;
