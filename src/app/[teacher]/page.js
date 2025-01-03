import Link from "next/link";

import "./register.css";
import Profile from "@/components/Profile";

const ProfileShow = ({params}) => {
  return (
    <div className="register-page">
      <h1>Update Profile</h1>
      <Profile params={params}/>
      <Link className="btn" href={`/${params.teacher}/classes`}>
        Return to classes
      </Link>
    </div>
  );
};

export default ProfileShow;

