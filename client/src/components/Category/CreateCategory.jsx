import { useState } from "react";
const CreateCategory = () => {
	const [name, setName] = useState("");
	function handleSave() {
		if (name == "") {
			return alert("Enter name");
		}
		var myHeaders = new Headers();
		var token = localStorage.getItem("x-auth-token");
		myHeaders.append("x-auth-token", token);
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			name: name,
		});

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch("http://localhost:3001/api/categories", requestOptions)
			.then((response) => response.text())
			.then((result) => {
				if (result.ok) {
					return alert("Category created successfully");
				} else {
					alert("An error occurred");
				}
			})
			.catch((error) => console.log("error", error));
	}
	return (
		<>
			<h1>Add new category</h1>
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
			<button onClick={handleSave}>Save</button>
		</>
	);
};
export default CreateCategory;
