import { allInstitutes } from "@/data/data";
import { notFound } from "next/navigation";
export const metadata = {
  title: "AMS | Login | Choose Technology",
};
export default function RootLayout({ children, params }) {
  let found = allInstitutes.find((institute) =>institute.id == params.institute)
  if (!found) {
    notFound()
  }
  return (
    <>
      {children}
    </>
  );
}
