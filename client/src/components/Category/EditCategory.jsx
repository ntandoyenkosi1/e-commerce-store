import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../Layout/Loading";
const EditCategory = (props) => {
	const [name, setName] = useState("");
	const { id } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		var myHeaders = new Headers();
		var token = localStorage.getItem("token");
		myHeaders.append("x-auth-token", token);
		myHeaders.append("Content-Type", "application/json");
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};

		fetch(`http://localhost:3001/api/categories/${id}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					return setName(result.data.name);
				} else {
					navigate("/internal-error");
				}
			})
			.catch((error) => {
				navigate("/internal-error");
			});
	}, []);
	function handleEdit() {
		if (name == "") {
			alert("Name cannot be empty");
		}
		var myHeaders = new Headers();
		var token = localStorage.getItem("token");
		myHeaders.append("x-auth-token", token);
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			name: name,
		});

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(`http://localhost:3001/api/categories/${id}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					return alert("Category updated successfully");
				} else {
					navigate("/internal-error");
				}
			})
			.catch((error) => {
				navigate("/internal-error");
			});
	}
	return (
		<div className="center">
			<div>
				<EditIcon color='secondary' fontSize='large' />
			</div>
			<h1>Edit Category</h1>
			{name == "" && (
				<Loading/>
			)}
			<div>
				<TextField
					variant='standard'
					type='text'
					id='name'
					onChange={() =>
						setName(document.getElementById("name").value)
					}
					value={name}
					placeholder='Category name'
				/>
			</div>
			<Button variant='contained' color='secondary' onClick={handleEdit}>
				<SaveOutlinedIcon />
				Save Changes
			</Button>
		</div>
	);
};
export default EditCategory;
