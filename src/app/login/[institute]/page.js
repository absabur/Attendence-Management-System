import Loading from "@/components/Loading";
import SearchClasses from "@/components/SearchClasses";
import { allDepartments, allInstitutes } from "@/data/data";
import Link from "next/link";


const Departments = ({ params }) => {
  return (
    <div className="page">
      <h1>Log In</h1>
      <div id="departmentList" className="links">
        <h2>Choose Department</h2>
        <SearchClasses element={"a"}/>
        {allDepartments.length === 0 && (
          <Loading />
        )}
        {allDepartments.map((dept) => (
          <Link
            href={`/login/${params.institute}/${dept.id}`}
            key={dept.id}
            className="link"
          >
            {dept.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Departments;


// export async function generateStaticParams() {

//   return allInstitutes.map((institute) => ({
//     institute: institute.id,
//   }));
// }
// export const revalidate = 5;

export async function generateStaticParams() {
  return []; // Return an empty array to handle the route dynamically.
}
