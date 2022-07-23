import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Loading from "../Layout/Loading";
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
					return setProducts(result.data);
				}
				navigate("/internal-error")
			})
			.catch((error) => {
				//console.log("error", error)
				navigate("/internal-error")
			});
	}, []);
	useEffect(() => {
		var r = localStorage.getItem("data");
		//console.log(r);
		if (r) {
			setRole(JSON.parse(r));
			//console.log(JSON.parse(r).roles);
		}
	}, []);
	function handleAddToCart(item) {
		var cart=localStorage.getItem("cart")
		if (!cart) return localStorage.setItem("cart",JSON.stringify([{product:item,quantity:1}]))
		if(cart.includes(JSON.stringify(item))){
			cart=JSON.parse(cart).map((c)=>{
				if(c.product._id==item._id){
					c.quantity=c.quantity+1
					return c
				}
				return c
			}
			)
			return localStorage.setItem("cart",JSON.stringify(cart))
		}
		else{
			cart=JSON.parse(cart)
			cart.push({product:item,quantity:1})
			return localStorage.setItem("cart",JSON.stringify(cart))
		}
	}
	return (
		<div className="center">
			<h1>Products</h1>
			{role && role.roles && role.roles.includes("admin") && (
				<div>
					<Link to={`/products/create`}>Add a new product</Link>
				</div>
			)}
			{products.length==0 && (
				<Loading/>
			) }
			<div className='container'>
				{products.map((item, key) => {
					return (
						<div
							className='card'
							key={key}
							style={{ backgroundColor: "white",cursor:"pointer" }}
							onClick={()=>navigate(`/products/${item._id}`)}
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
							<div className='card-item'>
								<Button
									variant='contained'
									color='secondary'
									fullWidth
									onClick={() =>
										handleAddToCart(item)
									}
								>
									<AddShoppingCartRoundedIcon />
									Add To Cart
								</Button>
							</div>
							{/* <Link to={`/products/${item._id}`}>
								<VisibilityOutlinedIcon/>
								View</Link>{" "} */}
							{role.roles.includes("admin") && (
								<div className="center">
									<Link to={`/products/edit/${item._id}`}>
										<EditOutlinedIcon/>
										Edit
									</Link>
									<Link to={`/products/delete/${item._id}`}>
										<DeleteOutlinedIcon/>
										Delete
									</Link>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Products;
