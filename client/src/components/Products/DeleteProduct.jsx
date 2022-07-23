import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from "../Layout/Loading";
const DeleteProduct = () => {
	const [product, setProduct] = useState([]);
	const navigate=useNavigate()
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
					return setProduct(result.data);
				}
				navigate("/internal-error")
			})
			.catch((error) => {
				//console.log("error", error)
				navigate("/internal-error")
			});
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
				//console.log(result);
				navigate("/internal-error")
			})
			.catch((error) => {
				//console.log("error", error)
				navigate("/internal-error")
			});
	}
	return (
		<div className="center">
			<div>
			<div>
				<DeleteIcon color="secondary" fontSize="large" />
				</div>
				<h1>Delete Product</h1>
			</div>
			<div>The following product with these details will be deleted:</div>
			{product.length == 0 && (
					<Loading/>
				)}
			<div className='input-text'>
				<TextField
					variant='standard'
					type='text'
					id='name'
					fullWidth
					disabled
					placeHolder='Product Name'
					value={product.name}
				/>
			</div>
			<div className='input-text'>
				<TextField
					variant='standard'
					type='text'
					id='price'
					fullWidth
					value={product.price}
					disabled
					placeHolder='Price'
				/>
			</div>
			<div className='input-text'>
				<TextField
					variant='standard'
					type='text'
					id='description'
					disabled
					fullWidth
					placeHolder='Description'
					value={product.description}
				/>
			</div>
			<div className='input-text'>
				<TextField
					variant='standard'
					disabled
					type='text'
					id='image'
					fullWidth
					placeHolder='Product Link'
					value={product.image}
				/>
			</div>
			<img src={`${product.image}`} width='200' height='200' />
			<div>
				<select disabled value={product.category}>
					<option></option>
					<option>Category 1</option>
					<option>Category 2</option>
					<option>Category 3</option>
				</select>
			</div>
			<Button
				variant='contained'
				title='Delete this product'
				color='secondary'
				onClick={handleDelete}
			>
				<SaveOutlinedIcon />
				Confirm
			</Button>
			<Button
				variant='contained'
				title='Cancel deletion'
				color='secondary'
			>
				<CancelOutlinedIcon />
				Cancel
			</Button>
		</div>
	);
};
export default DeleteProduct;
