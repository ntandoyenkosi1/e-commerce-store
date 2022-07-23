import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import image from "../../assets/home-image.jpg";
import { Button } from "react-bootstrap";

const Home = () => {
	const context = useContext(UserContext);
	console.log(context);
	const navigate = useNavigate();

	return (
		<div className='home-container'>
			<div>
				<img className="bg-image" src={image} alt='Photo by Tim Douglas : https://www.pexels.com/photo/happy-woman-jumping-with-shopping-bags-6567607/' width="100%" height="90%" style={{height:"100%"}} />
				<div className='home-main'>
					<h1>Your items. Delivered.</h1>
					<div  className=''>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</div>
					<Button onClick={()=>navigate("/products")}>Shop Now</Button>
				</div>
			</div>
			<div>
			</div>
		</div>
	);
};
export default Home;
