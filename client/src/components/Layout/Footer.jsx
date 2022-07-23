import logo from "../../assets/loading.gif";
import { Typography } from "@mui/material";
const Footer = () => {
	// add a footer to the page
	return (
		<div className="footer-main">
		<footer className='footer'>
			<span>
				<img className="logo" src={logo} alt='loading' />
			</span>
			<span className='footer-list'>
				<span>Home</span>
				<span>About</span>
				<span>Contact</span>
			</span>
			<span className='footer-list'>
				<span>Privacy Policy</span>
				<span></span>
				<span></span>
			</span>
			
		</footer>
		<div>
		<Typography variant='body2' color='text.secondary' align='center'>
		{"Copyright © "}
		{new Date().getFullYear()}
		{"."}
			</Typography>
			</div>
			</div>
	);
};
export default Footer;
