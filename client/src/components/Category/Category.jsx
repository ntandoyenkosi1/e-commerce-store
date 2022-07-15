import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
const Category = (props) => {
	const [category, setCategory] = useState([])
	const [role, setRole] = useState([])
	const { id } = useParams()
	const navigate=useNavigate()
	useEffect(() => {
		var myHeaders = new Headers();
	var token=localStorage.getItem("token")
	myHeaders.append("x-auth-token", token);

	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	};

	fetch(`http://localhost:3001/api/categories/${id}`, requestOptions)
		.then(response => response.json())
		.then(result => { 
			if (result.ok) {
				setCategory(result.data)
			}
		 })
		.catch(error => console.log('error', error));
	}, [])
	useEffect(() => {
		var r = localStorage.getItem("data");
		console.log(r);
		if (r) {
			setRole(JSON.parse(r));
			console.log(JSON.parse(r).roles);
		}
	}, []);
	return (
		<>
			<div>
				<h1>Category</h1>
				<div>
					{category.name}
				</div>
				{role.roles && role.roles.includes("admin") && (
					<>
				<button onClick={() => navigate(`/category/edit/${id}`)}>Edit</button>
						<Link to={`/category/delete/${id}`}>Delete</Link>
						</>
				)}
			</div>
		</>
	);
};
export default Category;
