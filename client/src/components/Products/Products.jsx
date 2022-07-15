import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
const Products = () => {
	const [products, setProducts] = useState([]);
	const [role, setRole] = useState([]);
	const navigate = useNavigate();
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
	useEffect(() => {
		var r = localStorage.getItem("data");
		console.log(r);
		if (r) {
			setRole(JSON.parse(r));
			console.log(JSON.parse(r).roles);
		}
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
			{role.roles && role.roles.includes("admin") && (
				<div>
					<Link to={`/products/create`}>Add a new product</Link>
				</div>
			)}
			<div className='container'>
				{products.map((item, key) => {
					return (
						<div
							className='card'
							key={key}
							style={{ backgroundColor: "white" }}
						>
							<img
								src={item.image}
								width='200'
								height='200'
								alt=''
							/>
							<div
								className='card-item'
								style={{
									backgroundColor: "white",
									position: "relative",
								}}
							>
								{item.name}
							</div>
							<div className='card-item'>R {item.price} </div>
							{/* <Link to={`/products/checkout/${item._id}`}>Buy</Link>{" "} */}
							<div className='card-item'>
								<Button
									variant='contained'
									color='secondary'
									onClick={() =>
										navigate(
											`/products/checkout/${item._id}`
										)
									}
								>
									<FavoriteBorderTwoToneIcon/>
									Buy
								</Button>
								<Button
									variant='contained'
									color='secondary'
									onClick={() =>
										handleAddToCart(item._id, item.price)
									}
								>
									<AddShoppingCartRoundedIcon />
									Add To Cart
								</Button>
							</div>
							<Link to={`/products/${item._id}`}>
								<VisibilityOutlinedIcon/>
								View</Link>{" "}
							{role.roles.includes("admin") && (
								<>
									<Link to={`/products/edit/${item._id}`}>
										<EditOutlinedIcon/>
										Edit
									</Link>
									<Link to={`/products/delete/${item._id}`}>
										<DeleteOutlinedIcon/>
										Delete
									</Link>
								</>
							)}
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Products;
