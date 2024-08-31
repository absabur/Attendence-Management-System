import { allDepartments } from "@/data/data";
import { notFound } from "next/navigation";
export const metadata = {
  title: "AMS | Login | Choose Teacher",
};
export default function RootLayout({ children, params }) {
  let found = allDepartments.find((institute) =>institute.id == params.department)
  if (!found) {
    notFound()
  }
  return (
    <>
      {children}
    </>
  );
}
