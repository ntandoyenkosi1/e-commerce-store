import { useState } from "react";
const Login = () => {
	const [email, setEmail] = useState("")
	const [password,setPassword]=useState("password")
	function handleLogin() {
		if (email == "") {
			alert("Enter email address")
			return
		}
		if (password == "") {
			alert("Enter password")
			return
		}
		var myHeaders = new Headers();
		var raw = JSON.stringify({
			"email": email,
			"password": password
		});
		myHeaders.append("Content-Type", "application/json");
		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};
console.log(requestOptions.body)
		fetch("http://localhost:3001/api/login", requestOptions)
			.then(response => response.json())
			.then((result) => {
				if (result.ok) {
					alert("You have successfully logged in")
					return
				}
				alert("An error occured")
			})
			.catch(error => console.log('error', error));
	}
	return (
		<>
			<h1>Login</h1>
			<div>
				<input type='text' id='email' onChange={()=>setEmail(document.getElementById("email").value)} value={email} placeholder='Email'  />
			</div>
			<div>
				<input type='password' id='password' onChange={()=>setPassword(document.getElementById("password").value)} value={password} placeholder='Password' />
			</div>
			<button onClick={handleLogin}>Login</button>
		</>
	);
};
export default Login;
