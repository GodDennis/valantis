import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";
import App from "./App";

const router = createHashRouter([
    {
        path: "/",
        element: <Navigate to={"/1"} />,
    },
    { path: "/:pageCount", element: <App /> },
]);

export const Router = () => {
    return <RouterProvider router={router} />;
};
