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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{ index: true, element: <HomePage /> }],
  },
  { path: "/logout", element: <LogoutPage /> },
  {
    path: "/auth",
    element: <AuthRoot />,
    children: [
      { path: "login/:token_expired?", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
