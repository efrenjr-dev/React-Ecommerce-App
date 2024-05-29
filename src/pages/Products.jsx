import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Product from "../components/Product";
import { Spinner } from "react-bootstrap";

export default function Products() {
    const [isLoading, setIsLoading] = useState(true);
    const [activeProducts, setActiveProducts] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch("https://e-commerce-api-2.vercel.app/products/", {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
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
                                className="d-flex flex-column align-items-stretch"
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
    }, []);

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
            <Row xs={1} sm={2} lg={4}>
                {activeProducts}
            </Row>
        </>
    );
}
