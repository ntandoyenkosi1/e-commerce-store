import { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import Loading from "../Layout/Loading";
const Profile = () => {
	const [user, setUser] = useState([]);
	const navigate=useNavigate()
	useEffect(() => {
		console.log(user)
		const id = JSON.parse(localStorage.getItem("data")).id;
		var myHeaders = new Headers();
		var token = localStorage.getItem("token");
		myHeaders.append("x-auth-token", token);
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};
		fetch(`http://localhost:3001/api/users/${id}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					return setUser(result.data);
				}
				navigate("/internal-error")
			})
			.catch((error) => {
				//console.log("error", error)
				navigate("/internal-error")
			});
	}, []);
	return (
		<div className="center">
			<div>
				<AccountCircleIcon color='secondary' fontSize='large' />
			</div>
			<h1>Profile</h1>
			<div>
			{user.length == 0 && (
				<Loading/>
				)}
				</div>
			{user.name && (
				<div className="center">
					<div>
						<b>Name:</b> {user.name}
					</div>
					<div>
						<b>Email:</b> {user.email}
					</div>
					<button style={{ cursor: "pointer" }} onClick={() => { console.log(user._id); navigate(`/orders/${user._id}`) }}>Go to orders</button>

				</div>
			)}
		</div>
	);
};
export default Profile;
