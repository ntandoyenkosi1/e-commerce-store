import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Loading from "../Loading";
const Cart = () => {
	const [cart, setCart] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch("http://localhost:3001/api/carts", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					return setCart(result.data);
        }
        navigate("/internal-error")
			})
			.catch((error) => {
				//console.log("error", error);
				navigate("/internal-error");
			});
	}, []);
	function handleRemove(id) {
		var requestOptions = {
			method: "DELETE",
			redirect: "follow",
		};

		fetch(`http://localhost:3001/api/carts/${id}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					setCart(cart.filter((item) => item._id !== id));
				}
			})
			.catch((error) => {
				//console.log("error", error);
				navigate("/internal-error");
			});
	}
	return (
		<div>
			<div className='logo'>
				<WysiwygIcon color='secondary' fontSize='large' />
			</div>
      <h1>Cart</h1>
      {cart.length == 0 && (
        <Loading/>
      )}
			{cart &&
				cart.map((item, key) => {
					//console.log(item);
					return (
						<div key={key}>
							<span>
								{item.product[0] && (
									<>
										{item.product[0].name} |{" "}
										{item.product[0].description} | R
										{item.product[0].price}{" "}
										<button
											onClick={() =>
												handleRemove(item._id)
											}
										>
											<DeleteOutlinedIcon />
											Remove
										</button>
									</>
								)}
							</span>
						</div>
					);
				})}
			<Link to={`/cart/checkout`}>
				<ShoppingCartCheckoutIcon />
				Checkout
			</Link>
		</div>
	);
};
export default Cart;
