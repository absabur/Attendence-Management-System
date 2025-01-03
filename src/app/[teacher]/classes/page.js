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



