import { Link } from "react-router-dom";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Cart from "./Cart";
import { useState } from "react";
import { useEffect } from "react";
const style = {
    position: "absolute",
    right: "0%",
    width: 300,
    height: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "scroll",
};
const CartModal = ({ cart, setCart, open, handleClose }) => {
    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")))
    }, [])
    const [total, setTotal] = useState(0);
    const [shipping, setShipping] = useState("Free");
    const getTotal = () => {
        var products = JSON.parse(localStorage.getItem("cart"));
        if (products) {
            products = products
                .map((item) => {
                    return item.product.price * item.quantity;
                })
                .reduce((prev, current) => prev + current, 0);
            setTotal(products.toFixed(2));
            if (products < 450) {
                setShipping("R100")
                setTotal((products + 100).toFixed(2))
            }
            else {
                setShipping("Free")
            }
        } else {
            setTotal(0)
        }
    };
    const updateCart = () => {
        var products = JSON.parse(localStorage.getItem("cart"));
        if (products) {
            setCart(products);
        }
    }
    useEffect(() => {
        getTotal();
        updateCart();
    }, []);
    return (
        <div className="center">
            <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                onLoad={() => {
                    getTotal()
                    updateCart()
                }}
            >
                <div className="center">
                    <Fade in={open}>
                        <Box sx={style}>
                            <Typography
                                id='transition-modal-title'
                                variant='h6'
                                component='h2'
                            >
                                My Cart
                            </Typography>
                            {!cart && <div>Your cart is empty</div>}
                            {cart?.length > 0 && (
                                <div className="center">
                                    <Cart getTotal={getTotal} data={cart} setCart={setCart} />
                                    <div>
                                        <Typography>
                                            <b>Shipping: </b>
                                            {shipping}
                                        </Typography>
                                        <Typography>
                                            <b>Total: </b> R{total}
                                        </Typography>
                                    </div>

                                    <Link
                                        onClick={() => handleClose()}
                                        to={`/cart/checkout`}
                                    >
                                        <ShoppingCartCheckoutIcon />
                                        Checkout
                                    </Link>
                                </div>
                            )}
                        </Box>
                    </Fade>
                </div>
            </Modal>
        </div>
    );
};
export default CartModal;