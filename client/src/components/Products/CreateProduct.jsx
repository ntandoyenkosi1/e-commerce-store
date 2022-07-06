import { useState } from "react";
const CreateProduct = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [image, setImage] = useState("");

	function handleCreate() {
		var myHeaders = new Headers();
		var token=localStorage.getItem("token")
		myHeaders.append("x-auth-token", token);
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			"name": name,
			"price": price,
			"description": description,
			"image": image,
			"category": "62b8af4d01d814bf69f65b36"
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		fetch("http://localhost:3001/api/products", requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('error', error));
	}
	function handleFileUpload(e) {
		console.log(e.target.files[0]);
	}
	return (
		<>
			<div>
				<h1>Add a new Product</h1>
				<div>
					<input
						onChange={() =>
							setName(document.getElementById("name").value)
						}
						value={name}
						type='text'
						id='name'
						placeHolder='Product Name'
					/>
				</div>
				<div>
					<input
						onChange={() =>
							setPrice(document.getElementById("price").value)
						}
						value={price}
						type='text'
						id='price'
						placeHolder='Price'
					/>
				</div>
				<div>
					<input
						type='text'
						id='description'
						placeHolder='Description'
						onChange={() =>
							setDescription(
								document.getElementById("description").value
							)
						}
						value={description}
					/>
				</div>
				<div>
					<span>Upload product image</span>
					<input type='file' onChange={(e) => handleFileUpload(e)} />
				</div>
				<div>
					<input
						type='text'
						id='image'
						placeHolder='Product Link'
						onChange={() =>
							setImage(document.getElementById("image").value)
						}
						value={image}
					/>
				</div>
				<select
					value={category}
					onChange={() => {
						setCategory(document.getElementById("category").value);
						console.log(category);
					}}
				>
					<option value='0'></option>
					<option value='Category 1'>Category 1</option>
					<option value='Category 2'>Category 2</option>
					<option value='Category 3'>Category 3</option>
				</select>
				<button onClick={handleCreate}>Create Product</button>
			</div>
		</>
	);
};
export default CreateProduct;