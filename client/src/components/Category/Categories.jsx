import { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
const Categories = () => {
	const [categories, setCategories] = useState([]);
	// read data from state object
	const { id } = useParams();
	const navigate = useNavigate();
	// read data passed to navigate object
	const { state } = useLocation();
	// read data from state object
	console.log(state, "state");
	useEffect(() => {
		var myHeaders = new Headers();
		var token = localStorage.getItem("token");
		myHeaders.append("x-auth-token", token);

		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};

		fetch("http://localhost:3001/api/categories", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				if (result.ok) {
					setCategories(result.data);
				}
			})
			.catch((error) => console.log("error", error));
	}, []);

	return (
		<>
			<div>
				<h1>Categories</h1>
				<Link to={`/category/create`}>Create a new category</Link>
				{categories.map((category, key) => {
					return (
						<div key={key}>
							<span>{category.name}</span>
							<Link to={`/category/${category._id}`}>View</Link>
							<Link to={`/category/edit/${category._id}`}>
								Edit
							</Link>
							<Link to={`/category/delete/${category._id}`}>
								Delete
							</Link>
						</div>
					);
				})}
			</div>
		</>
	);
};
export default Categories;
