import Card from "react-bootstrap/Card";

export default function Product({ productProp }) {
    return (
        <Card className="mb-5">
            <Card.Img
                variant="top"
                src="https://via.placeholder.com/300x200/000000/FFFFFF?text=Image"
            />
            <Card.Body>
                <Card.Title>{productProp.productName}</Card.Title>
                <Card.Subtitle>
                    Php{" "}
                    {productProp.price
                        .toFixed(2)
                        .toString()}
                </Card.Subtitle>
                <Card.Text>{productProp.description}</Card.Text>
            </Card.Body>
        </Card>
    );
}
