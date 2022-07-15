import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [role, setRole] = useState([]);
	useEffect(() => {
		var myHeaders = new Headers();
		var token = localStorage.getItem("token");
		myHeaders.append("x-auth-token", token);
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};
		fetch("http://localhost:3001/api/sales", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				if (result.ok) {
					setOrders(result.data);
				}
			})
			.catch((error) => console.log("error", error));
	}, []);
	useEffect(() => {
		var r = localStorage.getItem("data");
		console.log(r);
		if (r) {
			setRole(JSON.parse(r));
			console.log(JSON.parse(r).roles);
		}
	}, []);
	function handleRemove(id) {
		var myHeaders = new Headers();
		var token = localStorage.getItem("token");
		myHeaders.append("x-auth-token", token);
		var requestOptions = {
			method: "DELETE",
			headers: myHeaders,
			redirect: "follow",
		};

		fetch(`http://localhost:3001/api/sales/${id}`, requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
	}
	return (
		<>
			<h1>Orders</h1>
			<h4>View Orders</h4>
			{orders.map((item, key) => {
				return (
					<div key={key}>
						<span>
							{item.product[0].name} |{" "}
							{item.product[0].description} | R
							{item.product[0].price}{" "}
							<Link to={`/orders/${item._id}`}>View</Link>
							{role.roles.includes("admin") && (
								<Button
									variant='contained'
									color='secondary'
									onClick={() => handleRemove(item._id)}
								>
									Remove
								</Button>
							)}
						</span>
					</div>
				);
			})}
		</>
	);
};
export default Orders;
