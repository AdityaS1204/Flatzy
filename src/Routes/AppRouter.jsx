import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import { Admin, Home, Listings } from "../Pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "fz-admin",
        element: <Admin />,
      },
      {
        path: "listings",
        element: <Listings />,
      }
    ]
  }
]);

export default router;