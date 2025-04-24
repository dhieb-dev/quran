import { Link } from "react-router";

export const NotFound = () => {
  return (
    <div className="mt-20 flex justify-center items-center">
      <div className="p-4 md:p-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">404 Not Found</h1>
        <p className="text-lg md:text-xl mb-8">
          Oops! The page you are looking for could not be found.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg inline-block hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};
