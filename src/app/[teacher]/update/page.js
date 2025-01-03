import Link from "next/link";
import "@/app/register/register.css";
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

