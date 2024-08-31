import Link from "next/link";

const NotFound = () => {
  return (
    <div className="not-found-body">
      <div className="error-container">
        <div className="error-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>
            Sorry, the page you are looking for does not exist. It might have
            been moved or deleted.
          </p>
          <Link
            href="/"
            className="home-button"
            aria-label="Return to Homepage"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;