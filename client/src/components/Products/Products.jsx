import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
const Products = () => {
	const [products, setProducts] = useState([])
	useEffect(() => {
		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		};
		
		fetch("http://localhost:3001/api/products", requestOptions)
			.then(response => response.json())
			.then((result) => {
				if (result.ok) {
					setProducts(result.data)
				}
			})
			.catch(error => console.log('error', error));
	},[])
	return (
		<>
			<h1>Products</h1>
			<div>This is products</div>
			{products.map((item, key) => {
				return (
					<div key={key}>
						<span>{item.name} | {item.description} | R{item.price } <Link to={`/products/${item._id}`}>View</Link> <Link to={`/products/edit/${item._id}`}>Edit</Link> <Link to={`/products/delete/${item._id}`}>Delete</Link> <Link to={`/products/buy/${item._id}`}>Buy</Link> <Link to={`/products/add/${item._id}`}>Add To Cart</Link></span>
					</div>
				)
			})}
		</>
	);
};
export default Products;
