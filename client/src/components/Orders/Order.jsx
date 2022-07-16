import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
const Order = () => {
	const [order, setOrder] = useState([]);
	const { id } = useParams();
	const navigate=useNavigate()
	useEffect(() => {
		var myHeaders = new Headers();
		var token = localStorage.getItem("token");
		myHeaders.append("x-auth-token", token);
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};

		fetch(`http://localhost:3001/api/sales/${id}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				//console.log(result);
				if (result.ok) {
					return setOrder(result.data[0]);
				}
				navigate("/internal-error")
			})
			.catch((error) => {
				//console.log("error", error)
				navigate("/internal-error")
			});
	}, []);
	return (
		<>
			{order.product && (
				<div>
					<div className="logo">
						<WysiwygIcon color="secondary" fontSize="large" />
						</div>
					<h1>Order</h1>
					<h4><b>Your order details</b></h4>
					<div><b>Name:</b> {order?.product[0]?.name}</div>
					<div><b>Price:</b> {order?.product[0]?.price}</div>
					<div><b>Description:</b> {order?.product[0]?.description}</div>
					<div><b>Quantity:</b> {order?.quantity}</div>
					<div><b>Date:</b> {order?.date}</div>
				</div>
			)}
		</>
	);
};
export default Order;
