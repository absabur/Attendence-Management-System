import AddClassClient from "@/components/AddClass";
import "./addClass.css";
import Link from "next/link";

const AddClass = ({params}) => {
  return (
    <div className="add-class-page">
      <h1>Add a class</h1>
      <AddClassClient params={params} />
      <Link className="btn" href={`/${params.teacher}/classes`}>
        Return to classes
      </Link>
    </div>
  );
};

export default AddClass;


// export async function generateStaticParams() {
//   const teachers = await fetch("http://localhost:4000/teachers", { cache: "no-store"});
//   const teachersJson = await teachers.json();
//   return teachersJson.map((teacher) => ({
//     teacher: teacher.id,
//   }));
// }


export async function generateStaticParams() {
  return []; // Return an empty array to handle the route dynamically.
}
