import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import Loading from "../Layout/Loading";
const Product = () => {
	const [product, setProduct] = useState([]);
	const [role, setRole] = useState([]);
	const { id } = useParams();
	const navigate=useNavigate()
	useEffect(() => {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch(`http://localhost:3001/api/products/${id}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					return setProduct(result.data);
				}
				navigate("/internal-error")
			})
			.catch((error) => {
				navigate("/internal-error")
			});
	}, []);
	useEffect(() => {
		var r = localStorage.getItem("data");
		 
		if (r) {
			setRole(JSON.parse(r));
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
			<div className="center" >
				<WysiwygIcon style={{textAlign:"center"}} color="secondary" fontSize="large"/>
			</div>
			<h1>Product</h1>
			{product.length == 0 && (
				<Loading/>
			)}
			<div>{product.name}</div>
			<img src={product.image} width='200' height='200' alt='' />
			<div>{product.description}</div>
			<div>R{product.price}</div>
			
			<Button
				
				variant='contained'
				color='secondary'
				onClick={() => handleAddToCart(product)}
			>
				<AddShoppingCartRoundedIcon />
				Add to cart
			</Button>
			{role.roles && role.roles.includes("admin") && (
				<div className="center">
					<Link to={`/products/delete/${id}`}>
						<DeleteOutlinedIcon />
						Delete</Link>
					<Link to={`/products/edit/${id}`}>
						<EditOutlinedIcon />
						Edit</Link>
				</div>
			)}
		</div>
	);
};
export default Product;
