import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="pt-40 text-center">
      <h1 className="mb-4 text-4xl font-bold text-yellow-400">
        404 - Page Not Found
      </h1>
      <p className="mb-6 text-gray-400">
        The page you are looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mx-auto flex w-max gap-2 rounded bg-yellow-500 px-4 py-2 font-semibold text-black"
      >
        Go Home
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </Link>
    </div>
  );
}
