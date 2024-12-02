import "../class.css";
import TimeDate from "@/components/TimeDate";
import AttendenceTable from "@/components/AttendenceTable";
import EditDelete from "@/components/EditDelete";
import ClassDetails from "@/components/ClassDetails";

const Page = async ({ params }) => {
  return (
    <div className="class-page">
      <div className="class-details">
        <h2>Class Details</h2>
        <div className="time-date-details">
          <ClassDetails params={params}/>
          <div>
            <TimeDate />
            <EditDelete params={params} />
          </div>
        </div>
      </div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Attendance Sheet
      </h1>

      <AttendenceTable params={params} />
    </div>
  );
};

export default Page;

// export async function generateStaticParams() {
//   const classes = await fetch("http://localhost:4000/classes", { cache: "no-store"});
//   const classesJson = await classes.json();
//   return classesJson.map((classItem) => ({
//     class: classItem.id,
//   }));
// }
// export const revalidate = 5;


