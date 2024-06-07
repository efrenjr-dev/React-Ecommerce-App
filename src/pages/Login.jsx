import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";
import { UserContext } from "../userContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const { setUser } = useContext(UserContext);
    const [isFilled, setIsFilled] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (email !== "" && password !== "") {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    }, [email, password]);

    async function loginUser() {
        const loadingToast = toast.loading("Logging in");
        try {
            const loginResponse = await fetch(
                "https://e-commerce-api-2.vercel.app/users/login",
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                }
            );
            const data = await loginResponse.json();
            // console.log(data);
            if (data.accessToken) {
                localStorage.setItem("ecommercetoken", data.accessToken);
                const userResponse = await fetch(
                    "https://e-commerce-api-2.vercel.app/users",
                    {
                        method: "GET",
                        mode: "cors",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "ecommercetoken"
                            )}`,
                        },
                    }
                );
                const userData = await userResponse.json();
                // console.log(localStorage.getItem("ecommercetoken"));
                // console.log(userData);
                setUser({
                    id: userData.id,
                    isAdmin: userData.isAdmin,
                });
                toast.success(`You have been logged in as ${email}`, {
                    id: loadingToast,
                });
                navigate("/");
            } else {
                toast.error(data.message, { id: loadingToast });
            }
        } catch (err) {
            console.log(err);
            toast.error(err.toString(), { id: loadingToast });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        loginUser();
    }

    return (
        <>
            <Row className="d-flex flex-column align-items-center">
                <Col xs md="6">
                    <h1 className="my-5 text-center">Login Page</h1>
                    <Form
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        <Form.Group
                            className="mb-3"
                            controlId="loginForm.controlEmail"
                        >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email address"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="loginForm.controlPassword"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                            />
                        </Form.Group>
                        <Button type="submit" disabled={!isFilled}>
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col className="text-center my-3">
                    <Link to={"/register"}>
                        Do not have an account? Sign up
                    </Link>
                </Col>
            </Row>
        </>
    );
}

// {
//     "email": "goodgirl@mail.com",
//     "password": "goodgirl"
// }
