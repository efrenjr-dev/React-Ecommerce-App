import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function Product({ productProp, isAdmin }) {
    let productURL = "";
    isAdmin
        ? (productURL = `/updateproduct/${productProp._id}`)
        : (productURL = `/product/${productProp._id}`);
    return (
        <Card as={Link} to={productURL} className="mb-5 text-link">
            {isAdmin && <Card.Header>ID: {productProp._id}</Card.Header>}
            <Card.Img
                variant="top"
                src="https://via.placeholder.com/300x200/222222/FFFFFF?text=Image"
            />
            <Card.Body>
                <Card.Title>{productProp.productName}</Card.Title>

                <Card.Subtitle>{productProp.description}</Card.Subtitle>

                <Card.Text>
                    {" "}
                    Php {productProp.price.toFixed(2).toString()}{" "}
                </Card.Text>
                {isAdmin &&
                    (productProp.isActive ? (
                        <Card.Footer className="text-success">
                            Active
                        </Card.Footer>
                    ) : (
                        <Card.Footer className="text-warning">
                            Inactive
                        </Card.Footer>
                    ))}
            </Card.Body>
        </Card>
    );
}
