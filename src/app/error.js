"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  const reset = () => {
    // Define your reset logic here, such as resetting state or performing any necessary actions
    // For example, you can reload the current page
    router.reload();
  };

  return (
    <div className="error-body">
      <div className="sw-error-page-container">
        <div className="sw-error-page-content">
          <h1 className="sw-error-page-title">Oops!</h1>
          <h2 className="sw-error-page-subtitle">Something Went Wrong</h2>
          <p className="sw-error-page-text">
            We are sorry, but something went wrong. Please try again later or
            contact support if the problem persists.
          </p>
          {/* <button
            style={{ marginBottom: "20px" }}
            className="sw-error-page-button"
            onClick={reset}
          >
            Try again
          </button> */}
          <br />
          <Link
            style={{ backgroundColor: "var(--color3)" }}
            href="/"
            className="sw-error-page-button"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}