import AuthCheck from "@/components/AuthCheck";
import "./classes.css";


export const metadata = {
  title: "AMS | Classes",
};
export default function RootLayout({ children }) {
  return (
    <>
      <AuthCheck />
      {children}
    </>
  );
}
