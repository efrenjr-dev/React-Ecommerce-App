import "./App.scss";

import { useState } from "react";
import { UserContext } from "./userContext";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";

import Container from "react-bootstrap/Container";
import { Toaster, toast } from "react-hot-toast";
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
import { useEffect } from "react";

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
                path: "/product/:productId",
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
                path: "/updateproduct/:productId",
                element: <UpdateProduct />,
            },
            {
                path: "/order/:orderId",
                element: <ViewOrder />,
            },
        ],
    },
]);

export default function App() {
    console.log("API URL", process.env.REACT_APP_API_URL);
    return <RouterProvider router={router} />;
}

function Root() {
    const [user, setUser] = useState({
        id: null,
        isAdmin: null,
    });

    const unsetUser = () => {
        localStorage.removeItem("ecommercetoken");
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/users`, {
            method: "GET",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "ecommercetoken"
                )}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setUser({ id: data.id, isAdmin: data.isAdmin });
            })
            .catch((err) => {
                console.log(err.toString());
                toast.error(err.toString());
            });
    }, []);

    return (
        <>
            <UserContext.Provider value={{ user, setUser, unsetUser }}>
                <Toaster
                    toastOptions={{
                        // duration: 7000,
                        position: "top-center",
                        reverseOrder: true,
                    }}
                />
                <AppNavBar />
                <Container>
                    <Outlet />
                </Container>
            </UserContext.Provider>
        </>
    );
}
