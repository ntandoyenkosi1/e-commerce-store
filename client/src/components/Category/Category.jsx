import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import Loading from "../Layout/Loading";
const Category = (props) => {
	const [category, setCategory] = useState([]);
	const [role, setRole] = useState([]);
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

		fetch(`http://localhost:3001/api/categories/${id}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					return setCategory(result.data);
				}
				navigate("/internal-error");
			})
			.catch((error) => {
				//console.log("error", error)
				navigate("/internal-error");
			});
	}, []);
	useEffect(() => {
		var r = localStorage.getItem("data");
		if (r) {
			setRole(JSON.parse(r));
		}
	}, []);
	return (
		<div className="center">
			<div>
				<WysiwygIcon color='secondary' fontSize='large' />
			</div>
			<div>
				<h1>Category</h1>
				<div>
					{category.length == 0 && (
						<Loading/>
					)}
				</div>
				<div>
					<b>Name:</b>
					{category.name}
				</div>
				{role.roles && role.roles.includes("admin") && (
					<div className="center">
						<button
							onClick={() => navigate(`/category/edit/${id}`)}
						>
							<EditOutlinedIcon />
							Edit
						</button>
						<Link to={`/category/delete/${id}`}>
							<DeleteOutlinedIcon />
							Delete
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};
export default Category;
