import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "react-bootstrap/esm/Button";

export default function ViewProduct() {
    const { productId } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [productQuantity, setProductQuantity] = useState(1);
    const [subtotal, setSubtotal] = useState(0);
    const [productDetails, setIsProductDetails] = useState({
        id: null,
        productName: null,
        description: null,
        price: 0,
    });

    useEffect(() => {
        // console.log(productId);
        setIsLoading(true);
        fetch(`https://e-commerce-api-2.vercel.app/products/${productId}`)
            .then((result) => result.json())
            .then((data) => {
                setIsProductDetails({
                    id: data._id,
                    productName: data.productName,
                    description: data.description,
                    price: data.price,
                });
                setSubtotal(data.price * productQuantity);
                setIsLoading(false);
            })
            .catch((error) => error);
    }, []);

    useEffect(() => {
        if (productQuantity < 1) {
            toast.error("Quantity cannot be less than 1", {
                id: "quantityToast",
            });
            setProductQuantity(1);
        } else if (productQuantity > 40) {
            toast.error("Quantity cannot be more than 40", {
                id: "quantityToast",
            });
            setProductQuantity(40);
        } else {
            setSubtotal(productDetails.price * productQuantity);
        }
    }, [productQuantity]);

    const handleProductQuantity = (e, type) => {
        if (type === "input") {
            setProductQuantity(e.target.value);
        } else if (type === "+") {
            // console.log(productQuantity);
            setProductQuantity(Number(productQuantity) + 1);
        } else if (type === "-") {
            // console.log(productQuantity);
            setProductQuantity(productQuantity - 1);
        }
    };

    const addToCart = (e) => {
        e.preventDefault;
    };

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
            <Row className="mt-5 justify-content-center align-items-center d-flex">
                <Col xs={12} sm={6} lg={4}>
                    {/* <h1 className="my-5 text-center">
                        {productDetails.productName}
                    </h1> */}
                    {/* <p>{productId}</p> */}
                    {/* <p>{JSON.stringify(productDetails)}</p> */}
                    <Card className="mb-5 text-link">
                        <Card.Img
                            variant="top"
                            src="https://via.placeholder.com/300x200/000000/FFFFFF?text=Image"
                        />
                        <Card.Body>
                            <Card.Title>
                                {productDetails.productName}
                            </Card.Title>
                            <Card.Subtitle>
                                {productDetails.description}
                            </Card.Subtitle>
                            <Card.Text>
                                Php {productDetails.price.toFixed(2).toString()}
                            </Card.Text>
                            <Form>
                                <Form.Group className="mb-3 flex-row d-flex align-items-center justify-content-center">
                                    <Form.Label className="me-3">
                                        Quantity
                                    </Form.Label>
                                    <Button
                                        onClick={(e) =>
                                            handleProductQuantity(e, "-")
                                        }
                                    >
                                        -
                                    </Button>
                                    <Form.Control
                                        type="number"
                                        value={productQuantity}
                                        onChange={(e) =>
                                            handleProductQuantity(e, "input")
                                        }
                                        className="mx-2 number-input"
                                    />
                                    <Button
                                        onClick={(e) =>
                                            handleProductQuantity(e, "+")
                                        }
                                    >
                                        +
                                    </Button>
                                </Form.Group>
                                <Card.Subtitle className="mt-3">
                                    Subtotal (Php)
                                </Card.Subtitle>
                                <Card.Text>{subtotal.toFixed(2)}</Card.Text>
                                <Button onClick={addToCart}>Add to Cart</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
