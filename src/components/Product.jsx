import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function Product({ productProp }) {
    return (
        <Card
            as={Link}
            to={`/product/${productProp._id}`}
            className="mb-5 text-link"
        >
            <Card.Img
                variant="top"
                src="https://via.placeholder.com/300x200/000000/FFFFFF?text=Image"
            />
            <Card.Body>
                <Card.Title>{productProp.productName}</Card.Title>
                <Card.Subtitle>{productProp.description}</Card.Subtitle>
                <Card.Text>
                    Php {productProp.price.toFixed(2).toString()}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
