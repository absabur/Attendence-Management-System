import { notFound } from "next/navigation";
export const metadata = {
  title: "AMS | Login | Enter password",
};
export default async function RootLayout({ children, params }) {
  let res = await fetch(`http://localhost:4000/teachers/${params.teachers}`, {
    cache: "no-store",
  });
  if (res.status == 404) {
    notFound();
  }
  return <>{children}</>;
}
