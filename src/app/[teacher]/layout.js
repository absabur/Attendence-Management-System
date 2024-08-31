import AuthCheck from "@/components/AuthCheck";
import OwnerProfile from "@/components/OwnerProfile";
import { notFound } from "next/navigation";

export const metadata = {
  title: "AMS | Teacher Profile",
};

export default async function RootLayout({ children, params }) {
  let res = await fetch(`http://localhost:4000/teachers/${params.teacher}`)
  if (res.status == 404) {
    notFound()
  }
  return (
    <>
      <OwnerProfile params={params} />
      <AuthCheck />
      {children}
    </>
  );
}