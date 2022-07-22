import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import "../styles.css";
const Home = () => {
	const context = useContext(UserContext)
	console.log(context)
	return (
		<>
			<h1>Home</h1>
			<div className='text-3xl font-bold underline'>
				This is the home page
			</div>
			</>
	);
};
export default Home;
