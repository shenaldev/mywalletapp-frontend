import { Link } from "react-router-dom";
import fixingBug from "../assets/img/fixing-bug.svg";

function ErrorBoundary() {
  return (
    <div className="app-error flex justify-center items-center h-screen">
      <div className="text-center">
        <img src={fixingBug} alt="Fixing Bug Image" className="max-w-xs mx-auto mb-8" />
        <h1 className="text-2xl md:text-3xl mb-4 font-semibold">Something Went Wrong!</h1>
        <p className="text-slate-700 mb-8">Sorry we have an app error. Please try after some time or try reloading page.</p>
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

export default ErrorBoundary;
