import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex justify-center items-center w-full h-screen page-404">
      <div className="text-center">
        <h1 className="text-9xl text-red-500 mb-8">404</h1>
        <h2 className="text-2xl md:text-3xl mb-4">Page Not Found</h2>
        <p className="text-slate-700 mb-8">Oops! The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="bg-blue-500 text-white border border-blue-300 px-8 py-3 font-medium shadow-md shadow-purple-300 hover:bg-blue-600"
        >
          Go To Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
