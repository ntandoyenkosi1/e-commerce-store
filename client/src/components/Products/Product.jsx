import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
const Product = () => {
	const [product, setProduct] = useState([]);
	const { id } = useParams();
	useEffect(() => {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch(`http://localhost:3001/api/products/${id}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					setProduct(result.data);
				}
			})
			.catch((error) => console.log("error", error));
	}, []);
	function handleAddToCart(id, price) {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			product: id,
			quantity: 1,
			price: price,
		});

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch("http://localhost:3001/api/carts", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					console.log(result.data);
				}
			})
			.catch((error) => console.log("error", error));
	}
	return (
		<>
			<h1>Product</h1>
			<div>{product.name}</div>
			<img src={product.image} width='200' height='200' alt='' />
			<div>{product.description}</div>
			<div>R{product.price}</div>
			<Link to={`/products/checkout/${product._id}`}>Buy</Link>{" "}
			<button onClick={() => handleAddToCart(product._id, product.price)}>
				Add to cart
			</button>
			<Link to={`/products/delete/${id}`}>Delete</Link>
			<Link to={`/products/edit/${id}`}>Edit</Link>
		</>
	);
};
export default Product;
