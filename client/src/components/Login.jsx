import { useState } from "react";
import { Button, Input } from "@mui/material";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("password");
	function handleLogin() {
		if (email == "") {
			alert("Enter email address");
			return;
		}
		if (password == "") {
			alert("Enter password");
			return;
		}
		var myHeaders = new Headers();
		var raw = JSON.stringify({
			email: email,
			password: password,
		});
		myHeaders.append("Content-Type", "application/json");
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};
		fetch("http://localhost:3001/api/login", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					alert("You have successfully logged in");
					localStorage.setItem("token", result.token);
					localStorage.setItem("data",JSON.stringify(result.data));
					return;
				} else {
				}
				alert("An error occured");
			})
			.catch((error) => console.log("error", error));
	}
	return (
		<>
			<h1>Login</h1>
			<div>
				<Input color="secondary" 
					type='text'
					id='email'
					onChange={() =>
						setEmail(document.getElementById("email").value)
					}
					value={email}
					placeholder='Email'
				/>
			</div>
			<div>
				<Input color="secondary" 
					type='password'
					id='password'
					onChange={() =>
						setPassword(document.getElementById("password").value)
					}
					value={password}
					placeholder='Password'
				/>
			</div>
			<Button variant="contained" color="secondary" onClick={handleLogin}>Login</Button>
		</>
	);
};
export default Login;
