import { notFound } from "next/navigation";

export const metadata = {
  title: "AMS | Student details",
};
export default async function RootLayout({ children, params }) {
  let res = await fetch(`http://localhost:4000/students/${params.student}`)
  if (res.status == 404) {
    notFound()
  }
  return <>{children}</>;
}
