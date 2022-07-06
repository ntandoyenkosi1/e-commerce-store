import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const EditProduct = () => {
	const [product, setProduct] = useState([]);
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [image, setImage] = useState("");
	const { id } = useParams();
	useEffect(() => {
		var myHeaders = new Headers();
		var token = localStorage.getItem("token");
		myHeaders.append("x-auth-token", token);
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};

		fetch(`http://localhost:3001/api/products/${id}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					setProduct(result.data);
					setName(result.data.name)
					setCategory(result.data.category)
					setImage(result.data.image)
					setPrice(result.data.price)
					setDescription(result.data.description)
				}
			})
			.catch((error) => console.log("error", error));
	}, []);
	function handleEdit() {
		var myHeaders = new Headers();
		var token = localStorage.getItem("token");
		myHeaders.append("x-auth-token", token);
		myHeaders.append("Content-Type", "application/json");
		const raw = JSON.stringify({
				"name": name,
				"price": price,
				"description": description,
				"image": image,
				"category": category
		});
		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body:raw,
			redirect: "follow",
		};

		fetch(`http://localhost:3001/api/products/${id}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				console.log(result)
				if (result.ok) {
					return alert("Product updated successfully");
				}
				console.log(result);
			})
			.catch((error) => console.log("error", error));
	}
	function handleFileUpload(e) {
		console.log(e.target.files[0]);
	}
	return (
		<>
			<div>
				<h1>Edit Product</h1>
				<div>
					<input
						type='text'
						id='name'
						value={name}
						placeHolder='Product Name'
						onChange={()=>setName(document.getElementById("name").value)}
					/>
				</div>
				<div>
					<input
						type='text'
						id='price'
						value={price}
						placeHolder='Price'
						onChange={()=>setPrice(document.getElementById("price").value)}
					/>
				</div>
				<div>
					<input
						type='text'
						id='description'
						placeHolder='Description'
						value={product.description}
						onChange={()=>setDescription(document.getElementById("description").value)}
					/>
				</div>
				<div>
					<span>Update product image</span>
				</div>
				<input type='file' onChange={(e)=>handleFileUpload(e)} />
				<div>
					<input
						type='text'
						value={product.image}
						id='image'
						placeHolder='Product Link'
						onChange={()=>setImage(document.getElementById("image").value)}
					/>
				</div>
				<select value={product.category}>
				<option value='0'></option>
					<option value='Category 1'>Category 1</option>
					<option value='Category 2'>Category 2</option>
					<option value='Category 3'>Category 3</option>
				</select>
				<div>
					<button onClick={handleEdit}>Save Changes</button>
					<button>Cancel</button>
				</div>
			</div>
		</>
	);
};
export default EditProduct;
