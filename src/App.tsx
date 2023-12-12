import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Import Styles
import "./assets/css/styles.css";
// Import Pages
import Root from "./Root";
import AuthRoot from "./AuthRoot";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import LogoutPage from "./pages/Auth/LogoutPage";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./pages/ErrorBoundary";
import ReportsPage from "./pages/ReportsPage";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "reports", element: <ReportsPage /> },
    ],
  },
  { path: "/logout", element: <LogoutPage /> },
  { path: "/error", element: <ErrorBoundary /> },
  {
    path: "/auth",
    element: <AuthRoot />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "login/:token_expired?", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

function App() {
  //CHECK FOR DARKMODE
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme == "dark") {
      document.getElementById("root")?.classList.add("dark");
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
