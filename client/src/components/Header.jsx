import { Link } from "react-router-dom";
const Header = () => {
	return (
		<>
			<Link to='/'>Home</Link>
			<Link to='/products'>Products</Link>
			<Link to='/orders'>Orders</Link>
			<Link to='/category'>Categories</Link>
			<Link to='/login'>Login</Link>
			<Link to='/sign-up'>Sign up</Link>
			<Link to='/profile'>Profile</Link>
		</>
	);
};
export default Header;
