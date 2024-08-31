import Link from "next/link";

import "./register.css";
import UpgradeTeacher from "@/components/UpgradeTeacher";

const TeacherForm = () => {
  return (
    <div className="register-page">
      <h1>Update Profile</h1>
      <UpgradeTeacher />
      <Link className="btn" href={`/classes`}>
        Return to classes
      </Link>
    </div>
  );
};

export default TeacherForm;

