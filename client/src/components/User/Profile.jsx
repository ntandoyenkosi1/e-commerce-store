import { useState, useEffect } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Profile = () => {
	const [user, setUser] = useState({});
	useEffect(() => {
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
					setUser(result.data);
				}
			})
			.catch((error) => console.log("error", error));
	}, []);
	return (
		<>
			<div className="logo">
				<AccountCircleIcon color="secondary" fontSize="large" />
			</div>
			<h1>Profile</h1>
			{user.name && (
				<>
					<div><b>Name:</b> {user.name}</div>
					<div><b>Email:</b> {user.email}</div>
					{/* <div><b>Role:</b> {user.roles[0]}</div> */}
				</>
			)}
		</>
	);
};
export default Profile;
