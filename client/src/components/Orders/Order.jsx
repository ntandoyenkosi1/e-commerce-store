import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import Loading from "../Layout/Loading";
const Order = () => {
	const [order, setOrder] = useState([]);
	const [products, setProducts] = useState([]);
	const { id } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		var myHeaders = new Headers();
		var token = localStorage.getItem("token");
		myHeaders.append("x-auth-token", token);
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};
		fetch(`http://localhost:3001/api/sale/${id}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					return setOrder(result.data);
				}
				navigate("/internal-error");
			})
			.catch((error) => {
				navigate("/internal-error");
			});
	}, []);
	useEffect(() => {
		if (order && order.product) {
			let productItems = order.product.map((s) => {
				return (
					s._id +
					"||" +
					order.product.filter((x) => x._id == s._id).length +
					"||" +
					s.name +
					"||" +
					s.description +
					"||" +
					s.image +
					"||" +
					s.price
				);
			});
			var products1 = Array.from(new Set(productItems)).map((item) => {
				var s = item.split("||");
				return {
					id: s[0],
					quantity: Number(s[1]),
					name: s[2],
					description: s[3],
					image: s[4],
					price: Number(s[5]),
					total: Number(s[5]) * Number(s[1]),
				};
			});
			setProducts(products1);
		}
	}, [order]);
	return (
		<div className='center'>
			{order.product && (
				<div>
					<div>
						<WysiwygIcon color='secondary' fontSize='large' />
					</div>
					<h1>Order</h1>
					<h4>
						<b>Your order details</b>
					</h4>
					<div>{order.length == 0 && <Loading />}</div>
					<div>
						<b>Ordered on:</b> {order.date.slice(0, 10)} at{" "}
						{order.date.slice(15, 19)}
					</div>
					<h4>Products ordered</h4>
					{products.map((product) => {
						return (
							<div key={product.id}>
								<span>
									<b>Name: </b>
									{product.name}
								</span>
								{"  "}
								<span>
									<b>Description: </b>
									{product.description}
								</span>
								{"  "}
								<span>
									<b>Quantity: </b>
									{product.quantity}
								</span>
								{"  "}
								<span>
									<b>Price per unit: </b>
									{product.price}
								</span>
								{"  "}
								<span>
									<b>Total: </b>R{product.total}
								</span>
								{"  "}
							</div>
						);
					})}
					<button
						onClick={() => navigate(`/orders/${order.user[0]}`)}
					>
						Go back
					</button>
				</div>
			)}
		</div>
	);
};
export default Order;
