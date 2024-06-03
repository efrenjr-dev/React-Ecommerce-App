import { useContext, useEffect, useState } from "react";
import { UserContext } from "../userContext";
import CartList from "../components/CartList";
import { toast } from "react-hot-toast";
import { Button } from "react-bootstrap";

export default function Cart() {
    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        JSON.parse(localStorage.getItem("ecommercecarts")).forEach((item) => {
            if (item.id === user.id) {
                setProducts(item.products);
            }
        });
    }, [user]);

    useEffect(() => {
        let totalAmount=0;
        products.forEach(
            (p) => (totalAmount = totalAmount + p.priceSold * p.quantity)
        );
        setTotal(totalAmount);
        setCartList(
            <CartList products={products} onChangeQuantity={onChangeQuantity} />
        );
        
    }, [products]);

    const handleOrder = async (e) => {
        let loadingToast = toast.loading("Adding order");
        let totalAmount = 0;
        products.forEach(
            (p) => (totalAmount = totalAmount + p.priceSold * p.quantity)
        );
        let order = { products: products, totalAmount: totalAmount };
        // console.log(order);
        try {
            const response = await fetch(
                "https://e-commerce-api-2.vercel.app/users/createOrder",
                {
                    method: "PUT",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "ecommercetoken"
                        )}`,
                    },
                    body: JSON.stringify(order),
                }
            );
            const data = await response.json();
            // console.log(data);
            toast.success(data.message, {
                id: loadingToast,
            });
        } catch (err) {
            toast.error(err.toString(), {
                id: loadingToast,
            });
        }
    };

    const onChangeQuantity = (e, productId, type) => {
        let totalAmount = 0;
        setProducts(
            products.map((p) => {
                // console.log(p);
                if (p.productId === productId) {
                    if (type === "input") {
                        if (e.target.value === 1) {
                            toast.error("Quantity cannot be less than 1", {
                                id: "quantityToast",
                            });
                            return { ...p };
                        } else if (e.target.value > 40) {
                            toast.error("Quantity cannot be more than 40", {
                                id: "quantityToast",
                            });
                            return { ...p };
                        } else {
                            totalAmount =
                                totalAmount + p.priceSold * e.target.value;
                            return { ...p, quantity: e.target.value };
                        }
                    } else if (type === "+") {
                        // console.log(productQuantity);
                        if (p.quantity >= 40) {
                            toast.error("Quantity cannot be more than 40", {
                                id: "quantityToast",
                            });
                            totalAmount = totalAmount + p.priceSold * 40;
                            return { ...p, quantity: 40 };
                        }
                        totalAmount =
                            totalAmount + p.priceSold * (p.quantity + 1);
                        return { ...p, quantity: Number(p.quantity) + 1 };
                    } else if (type === "-") {
                        // console.log(productQuantity);
                        if (p.quantity <= 1) {
                            toast.error("Quantity cannot be less than 1", {
                                id: "quantityToast",
                            });
                            totalAmount = totalAmount + p.priceSold * 1;
                            return { ...p, quantity: 1 };
                        }
                        totalAmount =
                            totalAmount + (p.priceSold * (p.quantity - 1));
                        return { ...p, quantity: p.quantity - 1 };
                    }
                    totalAmount = totalAmount + p.priceSold * p.quantity;
                    // return p;
                }
                totalAmount = totalAmount + p.priceSold * p.quantity;
                return p;
            })
        );
        setTotal(totalAmount);
    };

    return (
        <>
            <h1 className="text-center my-5">Your Cart</h1>
            {cartList}
            <p>Total Amount: {total}</p>
            <Button onClick={handleOrder} className="d-flex ms-auto">
                Order
            </Button>
        </>
    );
}
