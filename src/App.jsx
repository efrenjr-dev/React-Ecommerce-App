import "./App.scss";
import Container from "react-bootstrap/Container";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import AppNavBar from "./components/AppNavBar";

// routes
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import ViewProduct from "./pages/ViewProduct";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Register from "./pages/Register";
import UpdateProduct from "./pages/UpdateProduct";
import ViewOrder from "./pages/ViewOrder";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/product",
                element: <ViewProduct />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/addproduct",
                element: <AddProduct />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/logout",
                element: <Logout />,
            },
            {
                path: "/orders",
                element: <Orders />,
            },
            {
                path: "/products",
                element: <Products />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/updateproduct",
                element: <UpdateProduct />,
            },
            {
                path: "/order",
                element: <ViewOrder />,
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}

function Root() {
    return (
        <>
            <Toaster
                toastOptions={{
                    // duration: 7000,
                    reverseOrder: true,
                }}
            />
            <AppNavBar />
            <Container>
                <Outlet />
            </Container>
        </>
    );
}
