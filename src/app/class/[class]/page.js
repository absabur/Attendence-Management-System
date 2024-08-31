import "../class.css";
import TimeDate from "@/components/TimeDate";
import AttendenceTable from "@/components/AttendenceTable";
import EditDelete from "@/components/EditDelete";
import { allDepartments } from "@/data/data";

const Page = async ({ params }) => {
  let classDetails = {};
  const response = await fetch(
    `http://localhost:4000/classes/${params.class}`,
    { cache: "no-store" }
  );
  const result = await response.json();

  let department = null;

  allDepartments.forEach((dept) => {
    if (dept.id == result.department) {
      department = dept.name;
    }
  });

  classDetails = {
    shift: result.shift,
    semester: result.semester,
    subject: result.subject,
    group: result.group,
    department: department,
  };

  return (
    <div className="class-page">
      <div className="class-details">
        <h2>Class Details</h2>
        <div className="time-date-details">
          <div>
            <table>
              <tbody>
                <tr>
                  <td>Department</td>
                  <td>{classDetails?.department || "Loading..."}</td>
                </tr>
                <tr>
                  <td>Semester</td>
                  <td>{classDetails?.semester || "Loading..."}</td>
                </tr>
                <tr>
                  <td>Shift</td>
                  <td>{classDetails?.shift || "Loading..."}</td>
                </tr>
                <tr>
                  <td>Group</td>
                  <td>{classDetails?.group || "N/A"}</td>
                </tr>
                <tr>
                  <td>Subject</td>
                  <td>{classDetails?.subject || "Loading..."}</td>
                </tr>
              </tbody>
            </table>
          </div>
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

