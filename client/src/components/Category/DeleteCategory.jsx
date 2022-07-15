import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material"
import TextField from "@mui/material/TextField";
const DeleteCategory = () => {
	const [name, setName] = useState("")
	const { id } = useParams()
	const navigate=useNavigate()
	useEffect(() => {
		var myHeaders = new Headers();
		var token = localStorage.getItem("token");
		myHeaders.append("x-auth-token", token);
		myHeaders.append("Content-Type", "application/json");
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};

		fetch(`http://localhost:3001/api/categories/${id}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					setName(result.data.name)
				} else {
					alert("An error occurred");
				}
			})
			.catch((error) => console.log("error", error));
	}, [])
	function handleDelete() {
		var myHeaders = new Headers();
		var token = localStorage.getItem("token");
		myHeaders.append("x-auth-token", token);
		myHeaders.append("Content-Type", "application/json");
		var requestOptions = {
			method: "DELETE",
			headers: myHeaders,
			redirect: "follow",
		};

		fetch(`http://localhost:3001/api/categories/${id}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					navigate("/category",{state:{message:"Category deleted successfully"}})
				} else {
					alert("An error occurred");
				}
			})
			.catch((error) => console.log("error", error));
	}
	return (
		<>
			<h1>Delete Category</h1>
			<div>
				<h6>
					The category with the following information below will be
					deleted
				</h6>
				<TextField variant="standard"
					type='text'
					id='name'
					disabled
					onChange={() =>
						setName(document.getElementById("name").value)
					}
					value={name}
					placeholder='Category name'
				/>
			</div>
			<Button variant="contained" color="secondary" onClick={handleDelete}>Confirm Deletion</Button>
			<Button variant="contained" color="danger">Cancel</Button>
		</>
	);
};
export default DeleteCategory