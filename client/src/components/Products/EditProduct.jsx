import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, TextField, Input } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";
const EditProduct = () => {
	const [product, setProduct] = useState([]);
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [image, setImage] = useState("");
	const { id } = useParams();
	const navigate = useNavigate();
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
					setName(result.data.name);
					setCategory(result.data.category);
					setImage(result.data.image);
					setPrice(result.data.price);
					setDescription(result.data.description);
					return;
				}
				navigate("/internal-error");
			})
			.catch((error) => {
				//console.log("error", error);
				navigate("/internal-error");
			});
	}, []);
	function handleEdit() {
		var myHeaders = new Headers();
		var token = localStorage.getItem("token");
		myHeaders.append("x-auth-token", token);
		myHeaders.append("Content-Type", "application/json");
		const raw = JSON.stringify({
			name: name,
			price: price,
			description: description,
			image: image,
			category: category,
		});
		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(`http://localhost:3001/api/products/${id}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					return alert("Product updated successfully");
				}
				navigate("/internal-error");
			})
			.catch((error) => {
				//console.log("error", error);
				navigate("/internal-error");
			});
	}
	function handleFileUpload(e) {
		//console.log(e.target.files[0]);
	}
	return (
		<>
			<div>
				<div className='logo'>
					<EditIcon color='secondary' fontSize='large' />
				</div>
				<h1>Edit Product</h1>
				<div className='input-text'>
					<Input
						variant='standard'
						type='text'
						id='name'
						fullWidth
						value={name}
						placeHolder='Product Name'
						onChange={() =>
							setName(document.getElementById("name").value)
						}
					/>
				</div>
				<div className='input-text'>
					<Input
						variant='standard'
						type='text'
						id='price'
						value={price}
						fullWidth
						placeHolder='Price'
						onChange={() =>
							setPrice(document.getElementById("price").value)
						}
					/>
				</div>
				<div className='input-text'>
					<Input
						variant='standard'
						type='text'
						id='description'
						placeHolder='Description'
						fullWidth
						value={product.description}
						onChange={() =>
							setDescription(
								document.getElementById("description").value
							)
						}
					/>
				</div>
				<div>
					<h4>Update product image</h4>
				</div>
				<input type='file' onChange={(e) => handleFileUpload(e)} />
				<div className='input-text'>
					<Input
						variant='standard'
						type='text'
						value={product.image}
						id='image'
						fullWidth
						placeHolder='Product Link'
						onChange={() =>
							setImage(document.getElementById("image").value)
						}
					/>
				</div>
				<select value={product.category}>
					<option value='0'></option>
					<option value='Category 1'>Category 1</option>
					<option value='Category 2'>Category 2</option>
					<option value='Category 3'>Category 3</option>
				</select>
				<div>
					<Button
						variant='contained'
						color='secondary'
						title='Save changes'
						onClick={handleEdit}
					>
						<SaveOutlinedIcon />
						Save
					</Button>
					<Button
						variant='contained'
						title='Cancel changes'
						color='secondary'
					>
						<CancelOutlinedIcon />
						Cancel
					</Button>
				</div>
			</div>
		</>
	);
};
export default EditProduct;
