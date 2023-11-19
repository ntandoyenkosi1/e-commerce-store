import { Link } from "react-router-dom";
import image from "../../assets/home-image.jpg";
import Slider from "./Slider";
import Section from "./Section";

const Home = () => {
	return (
		<div className='home-container'>
			<div>
				<img
					className='bg-image'
					src={image}
					alt='Photo by Tim Douglas : https://www.pexels.com/photo/happy-woman-jumping-with-shopping-bags-6567607/'

				/>
				<div className='home-main'>
					<h1>Your items. Delivered.</h1>
					<div className=''>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</div>
					<Link className="home-button" to='/products'>
						Shop Now
					</Link>
				</div>
			</div>
			<Section />
			<Slider />
		</div>
	);
};
export default Home;
