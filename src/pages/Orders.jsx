import { useEffect, useState } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        fetch("https://e-commerce-api-2.vercel.app/users/myOrders/", {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem(
                    "ecommercetoken"
                )}`,
            },
        })
            .then((result) => result.json())
            .then((data) => {
                // console.log(data.length);
                data.reverse();
                setOrders(
                    data.map((order) => {
                        // console.log("order");
                        let date = new Date(order.dateOrdered);
                        let strDate =
                            date.getMonth() +
                            1 +
                            "/" +
                            date.getDate() +
                            "/" +
                            date.getFullYear() +
                            " " +
                            date.getHours() +
                            ":" +
                            date.getMinutes();
                        return (
                            <tr key={order._id}>
                                <td>{strDate}</td>
                                <td className="text-end">
                                    {order.totalAmount.toFixed(2)}
                                </td>
                                <td>{order.orderStatus}</td>
                                <td>
                                    <Button
                                        as={Link}
                                        to={`/order/${order._id}`}
                                        className="btn-sm"
                                    >
                                        View
                                    </Button>
                                </td>
                            </tr>
                        );
                    })
                );
                setIsLoading(false);
            })
            .catch((error) => {
                return `ERROR! ${error}`;
            });
        // console.log(orders);
    }, []);

    return (
        <Container className="justify-content-center">
            <h1 className="text-center my-5">Orders Page</h1>
            {isLoading ? (
                <Spinner animation="grow" role="status" />
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <td>Date Ordered</td>
                            <td>Total Amount</td>
                            <td>Order Status</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>{orders}</tbody>
                </Table>
            )}
        </Container>
    );
}
