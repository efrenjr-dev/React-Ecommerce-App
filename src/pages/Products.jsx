import { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Product from "../components/Product";
import { Spinner } from "react-bootstrap";
import { UserContext } from "../userContext";

export default function Products() {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [activeProducts, setActiveProducts] = useState([]);

    useEffect(() => {
        if (!user.isAdmin) {
            setIsLoading(true);
            fetch("https://e-commerce-api-2.vercel.app/products/", {
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
                    // console.log(data);
                    setActiveProducts(
                        data.map((product) => {
                            // console.log(product);
                            return (
                                <Col
                                    className="d-flex justify-content-center align-items-stretch"
                                    key={product._id}
                                >
                                    <Product productProp={product} />
                                </Col>
                            );
                        })
                    );
                    setIsLoading(false);
                })
                .catch((error) => {
                    return `ERROR! ${error}`;
                });
        }
    }, []);

    useEffect(() => {
        if (user.isAdmin) {
            setIsLoading(true);
            fetch("https://e-commerce-api-2.vercel.app/products/all", {
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
                    // console.log(data);
                    setActiveProducts(
                        data.map((product) => {
                            // console.log(product);
                            return (
                                <Col
                                    className="d-flex justify-content-center align-items-stretch"
                                    key={product._id}
                                >
                                    <Product productProp={product} />
                                </Col>
                            );
                        })
                    );
                    setIsLoading(false);
                })
                .catch((error) => {
                    return `ERROR! ${error}`;
                });
        }
    }, [user]);

    return isLoading ? (
        <Row className="text-center mt-5">
            <Col>
                <Spinner animation="grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Col>
        </Row>
    ) : (
        <>
            <h1 className="my-5 text-center">Products Page</h1>
            <Row xs={1} sm={2} lg={3}>
                {activeProducts}
            </Row>
        </>
    );
}
