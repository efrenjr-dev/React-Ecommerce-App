import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

export default function AppNavBar() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        BRAND
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">
                                Home
                            </Nav.Link>
                            <NavDropdown
                                title="Products"
                                id="collapsible-nav-dropdown-products"
                            >
                                <NavDropdown.Item as={Link} to="/product">
                                    View Product
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/products">
                                    View Products
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/addproduct">
                                    Add Products
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/updateproduct">
                                    Update Product
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown
                                title="Orders"
                                id="collapsible-nav-dropdown-orders"
                            >
                                <NavDropdown.Item as={Link} to="/order">
                                    View Order
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/orders">
                                    View Orders
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        <Nav>
                            <Nav.Link as={Link} to="/cart">
                                Cart
                            </Nav.Link>
                            <Nav.Link as={Link} to="/register">
                                Register
                            </Nav.Link>
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                            <Nav.Link as={Link} to="/logout">
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
