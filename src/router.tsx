import { Navigate, RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";

const router = createBrowserRouter<RouteObject[]>([
    {
        path: "/",
        element: <Navigate to={"/1"} />,
    },
    { path: "/:pageCount", element: <App /> },
]);

export const Router = () => {
    return <RouterProvider router={router} />;
};
