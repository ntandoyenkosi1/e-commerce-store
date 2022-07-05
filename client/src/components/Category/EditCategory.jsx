import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
const EditCategory = (props) => {
	const [name, setName] = useState("");
	const { id } = useParams()
	useEffect(() => {
		var myHeaders = new Headers();
		var token = localStorage.getItem("x-auth-token");
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
	},[])
	function handleEdit() {
		if (name == "") {
			alert("Name cannot be empty");
		}
		var myHeaders = new Headers();
		var token = localStorage.getItem("x-auth-token");
		myHeaders.append("x-auth-token", token);
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			name: name,
		});

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(`http://localhost:3001/api/categories/${id}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					return alert("Category updated successfully");
				} else {
					alert("An error occurred");
				}
			})
			.catch((error) => console.log("error", error));
	}
	return (
		<>
			<h1>Edit Category</h1>
			<div>
				<input
					type='text'
					id='name'
					onChange={() =>
						setName(document.getElementById("name").value)
					}
					value={name}
					placeholder='Category name'
				/>
			</div>
			<button onClick={handleEdit}>Save Changes</button>
		</>
	);
};
export default EditCategory;
