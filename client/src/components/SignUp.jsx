import { useState } from "react";
import { Button, Input } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
const SignUp = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	function handleSignUp() {
		var name = document.getElementById("name").value;
		var email = document.getElementById("email").value;
		var password = document.getElementById("password").value;
		if (name == null) {
			console.log("name is not present");
			return;
		}
		if (email == null) {
			console.log("email is not present");
			return;
		}
		if (password == null) {
			console.log("email is not present");
			return;
		}
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		var raw = JSON.stringify({
			name: name,
			email: email,
			password: password,
		});
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch("http://localhost:3001/api/signup", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					alert("You have signed up successfully");
					return;
				}
				alert("An error occured. Please try again");
			})
			.catch((error) => console.log("error", error));
	}
	return (
		<>
			<div className='logo'>
				<AccountCircleRoundedIcon color='secondary' fontSize='large' />
			</div>
			<h1>Sign Up</h1>
			<div className='input-text'>
				<Input
					color='secondary'
					fullWidth
					type='text'
					id='name'
					placeholder='Name'
					onChange={() =>
						setName(document.getElementById("name").value)
					}
					value={name}
				/>
			</div>
			<div className='input-text'>
				<Input
					color='secondary'
					fullWidth
					type='text'
					id='email'
					placeholder='Email'
				/>
			</div>
			<div className='input-text'>
				<Input
					color='secondary'
					fullWidth
					type='password'
					id='password'
					placeholder='Password'
				/>
			</div>
			<Button
				variant='contained'
				color='secondary'
				onClick={handleSignUp}
			>
				
				Sign Up
				<LogoutOutlinedIcon />
			</Button>
		</>
	);
};
export default SignUp;
