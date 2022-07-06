import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Products = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch("http://localhost:3001/api/products", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					setProducts(result.data);
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
			<h1>Products</h1>
			<Link to={`/products/create`}>Add a new product</Link>
			{products.map((item, key) => {
				return (
					<div key={key}>
						<span>
							{item.name} | {item.description} | R{item.price}{" "}
							<Link to={`/products/${item._id}`}>View</Link>{" "}
							<Link to={`/products/edit/${item._id}`}>Edit</Link>{" "}
							<Link to={`/products/delete/${item._id}`}>
								Delete
							</Link>{" "}
							<Link to={`/products/checkout/${item._id}`}>Buy</Link>{" "}
							<button
								onClick={() =>
									handleAddToCart(
										item._id,
										item.price
									)
								}
							>
								Add To Cart
							</button>
						</span>
					</div>
				);
			})}
		</>
	);
};
export default Products;
