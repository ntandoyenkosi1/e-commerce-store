import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const Order = () => {
	const [order, setOrder] = useState([]);
	const { id } = useParams();
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
				console.log(result);
				if (result.ok) {
					setOrder(result.data[0]);
				}
			})
			.catch((error) => console.log("error", error));
	}, []);
	return (
		<>
			<h1>Order</h1>
			<div>Name {order?.product[0]?.name}</div>
			<div>Price {order.product[0]?.price}</div>
			<div>Description {order.product[0]?.description}</div>
			<div>Quantity {order.quantity}</div>
			<div>Date {order.date}</div>
		</>
	);
};
export default Order;
