import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Loading from "../Layout/Loading";
const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [role, setRole] = useState([]);
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
		fetch("http://localhost:3001/api/sales", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					return setOrders(result.data);
				}
				navigate("/internal-error")
			})
			.catch((error) => {
				//console.log("error", error)
				navigate("/internal-error")
			});
	}, []);
	useEffect(() => {
		var r = localStorage.getItem("data");
		//console.log(r);
		if (r) {
			setRole(JSON.parse(r));
			//console.log(JSON.parse(r).roles);
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
			.then((result) => { 
				if (result.ok) {
					return;
				}
				navigate("/internal-error")
			 })
			.catch((error) => {
				//console.log("error", error)
				navigate("/internal-error")
			});
	}
	return (
		<>
			<h1>Orders</h1>
			<h4>View Orders</h4>
			{orders.length == 0 && (
				<Loading/>
			)}
			{orders.map((item, key) => {
				return (
					<div key={key}>
						<span>
							{item.product[0].name} |{" "}
							{item.product[0].description} | R
							{item.product[0].price}{" "}
							<Link to={`/orders/${item._id}`}>
								<VisibilityOutlinedIcon />
								View
							</Link>
							{role.roles.includes("admin") && (
								<Button
									variant='contained'
									color='secondary'
									onClick={() => handleRemove(item._id)}
								>
									<DeleteOutlinedIcon />
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
