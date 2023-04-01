import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import Pages
import Root from "./Root";
import AuthRoot from "./AuthRoot";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import LogoutPage from "./pages/Auth/LogoutPage";

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
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
