import { useState } from "react";
import { Button, Input } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import Loading from "../Layout/Loading";
const CreateProduct = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [image, setImage] = useState("");
	const navigate=useNavigate()
	function handleCreate() {
		var myHeaders = new Headers();
		var token = localStorage.getItem("token");
		myHeaders.append("x-auth-token", token);
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			name: name,
			price: price,
			description: description,
			image: image,
			category: "62b8af4d01d814bf69f65b36",
		});

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch("http://localhost:3001/api/products", requestOptions)
			.then((response) => response.text())
			.then((result) => {
				return //console.log(result)
			})
			.catch((error) => {
				//console.log("error", error)
				navigate("/internal-error")
			});
	}
	function handleFileUpload(e) {
		//console.log(e.target.files[0]);
	}
	return (
		<div className="center">
			<div>
			<div className="icon">
				<AddCircleIcon color="secondary" fontSize="large" />
			</div>
				<h1>Add a new Product</h1>
				<div className='input-text'>
					<Input
						variant='standard'
						onChange={() =>
							setName(document.getElementById("name").value)
						}
						fullWidth
						value={name}
						type='text'
						id='name'
						placeholder='Product Name'
						required
					/>
				</div>
				<div className='input-text'>
					<Input
						color='secondary'
						variant='standard'
						onChange={() =>
							setPrice(document.getElementById("price").value)
						}
						value={price}
						type='text'
						fullWidth
						id='price'
						placeholder='Price'
						required
					/>
				</div>
				<div className='input-text'>
					<Input
						color='secondary'
						variant='standard'
						type='text'
						id='description'
						fullWidth
						placeholder='Description'
						required
						onChange={() =>
							setDescription(
								document.getElementById("description").value
							)
						}
						value={description}
					/>
				</div>
				<h4>Upload product image</h4>
				<div>
					<input type='file' onChange={(e) => handleFileUpload(e)} />
				</div>
				<div className='input-text'>
					<Input
						color='secondary'
						variant='standard'
						required
						type='text'
						id='image'
						fullWidth
						placeholder='Product Link'
						onChange={() =>
							setImage(document.getElementById("image").value)
						}
						value={image}
					/>
				</div>
				<div>
					<select
						value={category}
						onChange={() => {
							setCategory(
								document.getElementById("category").value
							);
							//console.log(category);
						}}
					>
						<option value='0'></option>
						<option value='Category 1'>Category 1</option>
						<option value='Category 2'>Category 2</option>
						<option value='Category 3'>Category 3</option>
					</select>
				</div>
				<Button
					variant='contained'
					color='secondary'
					onClick={handleCreate}
					title='Create a new product'
				>
					<AddIcon />
					Create
				</Button>
			</div>
		</div>
	);
};
export default CreateProduct;
