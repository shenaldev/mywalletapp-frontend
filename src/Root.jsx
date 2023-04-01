import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Layouts/Header";
import Sidebar from "./components/Layouts/Sidebar";
import { isAuth } from "./util/Auth";

function Root() {
  const auth = isAuth();
  if (!auth) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full px-8 py-8">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
