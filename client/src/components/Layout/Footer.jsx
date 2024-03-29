import logo from "../../assets/donut.png";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Footer = () => {
	const navigate=useNavigate()
	return (
		<div className='footer-main'>
			<footer className='footer'>
				<span className='footer-logo'>
					<img className='logo' src={logo} alt='loading' />
				</span>
				<span className='footer-list'>
					<span
						onClick={() => navigate("/")}
						style={{
							textDecoration: "underline",
							cursor: "pointer",
						}}
					>
						Home
					</span>
					<span
						onClick={() => navigate("/")}
						style={{
							textDecoration: "underline",
							cursor: "pointer",
						}}
					>
						About
					</span>
					<span
						onClick={() => navigate("/")}
						style={{
							textDecoration: "underline",
							cursor: "pointer",
						}}
					>
						Contact
					</span>
				</span>
				<span className='footer-list'>
					<span
						onClick={() => navigate("/")}
						style={{
							textDecoration: "underline",
							cursor: "pointer",
						}}
					>
						Privacy Policy
					</span>
					<span></span>
					<span></span>
				</span>
			</footer>
			<div>
				<Typography
					variant='body2'
					color='text.secondary'
					align='center'
				>
					{"Copyright © "}
					{new Date().getFullYear()}
					{"."}
				</Typography>
			</div>
		</div>
	);
};
export default Footer;
