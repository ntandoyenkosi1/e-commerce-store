import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const DeleteProduct = () => {
	const [product, setProduct] = useState([]);
	const { id } = useParams();
	useEffect(() => {
		var myHeaders = new Headers();
		var token=localStorage.getItem("token")
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
					setProduct(result.data)
				}
			})
			.catch((error) => console.log("error", error));
	}, []);
	function handleDelete() {
		var myHeaders = new Headers();
		var token = localStorage.getItem("token");
		
		myHeaders.append("x-auth-token", token);

		var requestOptions = {
			method: "DELETE",
			headers: myHeaders,
			redirect: "follow",
		};

		fetch(`http://localhost:3001/api/products/${id}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					return alert("Product deleted successfully");
				}
				console.log(result);
			})
			.catch((error) => console.log("error", error));
	}
	return (
		<>
			<div>
				<h1>Delete Product</h1>
			</div>
			<div>The following product with these details will be deleted:</div>
			<div>
				<input
					type='text'
					id='name'
					disabled
					placeHolder='Product Name'
					value={product.name}
				/>
			</div>
			<div>
				<input
					type='text'
					id='price'
					value={product.price}
					disabled
					placeHolder='Price'
				/>
			</div>
			<div>
				<input
					type='text'
					id='description'
					disabled
					placeHolder='Description'
					value={product.description}
				/>
			</div>
			<div>
				<input
					disabled
					type='text'
					id='image'
					placeHolder='Product Link'
					value={product.image}
				/>
				<img src={`${product.image}`} width='200' height='200' />
			</div>
			<div>
				<select disabled value={product.category}>
					<option></option>
					<option>Category 1</option>
					<option>Category 2</option>
					<option>Category 3</option>
				</select>
			</div>
			<button onClick={handleDelete}>Confirm Delete</button>
			<button>Cancel</button>
		</>
	);
};
export default DeleteProduct;
