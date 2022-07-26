import { useEffect, useState } from "react";

const Users = () => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		var myHeaders = new Headers();
		myHeaders.append("x-auth-token", localStorage.getItem("token"));

		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};
		fetch("http://localhost:3001/api/users/", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					return setUsers(result.data);
				}
			})
			.catch((error) => console.log("error", error));
  });
  function handleRemove(user) {
    var myHeaders = new Headers();
		myHeaders.append("x-auth-token", localStorage.getItem("token"));

		var requestOptions = {
			method: "DELETE",
			headers: myHeaders,
			redirect: "follow",
		};
		fetch(`http://localhost:3001/api/users/${user._id}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					return alert(`${user.name} has been removed successfully`)
				}
			})
			.catch((error) => console.log("error", error));
  }
  function handleMakeAdmin(user) {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      roles:["admin","client"]
		});
		var requestOptions = {
			method: "PUT",
      headers: myHeaders,
      body:raw,
			redirect: "follow",
		};
		fetch(`http://localhost:3001/api/users/${user._id}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					return alert(`${user.name} is now an admin`)
				}
			})
			.catch((error) => console.log("error", error));
  }
	return (
		<div>
			<h1>Users</h1>
			{users.map((user) => (
				<div key={user._id}>
					<span>{user.name}</span>
					{"  |  "}
					<span>{user.email}</span>
					{"  |  "}
					{user.roles && user.roles.includes("client") && (
						<button onClick={()=>handleMakeAdmin(user)}>Make Admin</button>
					)}
					<button onClick={()=>handleRemove(user)}>Remove user</button>
				</div>
			))}
		</div>
	);
};
export default Users;
