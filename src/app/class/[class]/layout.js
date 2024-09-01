import AuthCheck from "@/components/AuthCheck";
import "../class.css";
import { notFound } from "next/navigation";
import OwnerClass from "@/components/OwnerClass";
export const metadata = {
  title: "AMS | Class Attendence Sheet",
  description: "This is a attendence app for polytechnic institutes.",
};
export default async function RootLayout({ children, params }) {
  let res = await fetch(`http://localhost:4000/classes/${params.class}`, { cache: "no-store"})
  if (res.status == 404) {
    notFound()
  }
  return (
    <>
      <OwnerClass params={params} />
      <AuthCheck />
      {children}
    </>
  );
}
