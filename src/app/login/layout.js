import UnAuthCheck from "@/components/UnAuthCheck";
import './login.css'

export const metadata = {
  title: "AMS | Login",
};

export default function RootLayout({ children }) {
  return (
    <>
      <UnAuthCheck />
      {children}
    </>
  );
}
