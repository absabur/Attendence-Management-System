import UpdateClass from "@/components/UpdateClass";
import "./addClass.css";
import Link from "next/link";

const AddClass = ({ params }) => {
  

  return (
    <div className="add-class-page">
      <h1>Update class</h1>
      <UpdateClass params={params} />
      <Link className="btn" href={`/class/${params.class}`}>
        Return to class
      </Link>
    </div>
  );
};

export default AddClass;

// export async function generateStaticParams() {
//   const classes = await fetch("http://localhost:4000/classes", { cache: "no-store"});
//   const classesJson = await classes.json();
//   return classesJson.map((classItem) => ({
//     class: classItem.id,
//   }));
// }
// export const revalidate = 5;

export async function generateStaticParams() {
  return []; // Return an empty array to handle the route dynamically.
}
