import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
	const { id } = useParams();
	const [user, setUser] = useState({});
	useEffect(() => {
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
        console.log(result)
				if (result.ok) {
					setUser(result.data);
				}
			})
			.catch((error) => console.log("error", error));
	},[]);
	return (
		<>
			<h1>Profile</h1>
			<div>Name {user.name}</div>
			<div>Email {user.email}</div>
      <div>Role { user.roles[0]}</div>
		</>
	);
};
export default Profile;
