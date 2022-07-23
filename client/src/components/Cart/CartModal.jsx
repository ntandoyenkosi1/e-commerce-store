import { Link } from "react-router-dom";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Badge from "@mui/material/Badge";
import Cart from "./Cart";
import { useState } from "react";
import { useEffect } from "react";
const style = {
	position: "absolute",
	// top: '50%',
	right: "0%",

	//transform: 'translate(-50%, -50%)',
	width: 300,
	height: "90%",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	overflow: "scroll",
};
const button = {
	bottom: "20%",
};
const CartModal = (props) => {
	const [open, setOpen] = React.useState(false);
	const [total, setTotal] = useState(0);
	const [shipping, setShipping] = useState("Free");
	const [subTotal, setSubtotal] = useState(0);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const getTotal = () => {
		var products = JSON.parse(localStorage.getItem("cart"));
		if (products) {
			products = products
				.map((item) => {
					return item.product.price * item.quantity;
				})
				.reduce((prev, current) => prev + current, 0);
			console.log(products);
			setTotal(products);
		} else {
			console.log("Nothing");
			setTotal(0)
		}
	};
	useEffect(() => {
		getTotal();
	}, []);
	return (
		<div className="center">
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={props.open}
				onClose={props.handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
				onLoad={() => {
					getTotal()
					console.log("Modal loaded")
				}}
			>
				<div className="center">
					<Fade in={props.open}>
						<Box sx={style}>
							<Typography
								id='transition-modal-title'
								variant='h6'
								component='h2'
							>
								My Cart
							</Typography>
							{total == 0 && <div>Your cart is empty</div>}
							{total !=0 &&(
									<div className="center">
										<Cart />
										<div>
											<Typography>
												<b>Subtotal: </b>R{subTotal}
											</Typography>
											<Typography>
												<b>Shipping: </b>
												{shipping}
											</Typography>
											<Typography>
												<b>Total: </b> R{total}
											</Typography>
										</div>

										<Link
											onClick={() => props.handleClose()}
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
