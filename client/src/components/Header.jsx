import { Link, useNavigate } from "react-router-dom";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import React from "react";
import Badge from "@mui/material/Badge";
import CartModal from "./Cart/CartModal";
import PersonOutlineIcon from "@mui/icons-material/Permidentity";
import logo from "../assets/loading.gif";
const Header = () => {
	const [open, setOpen] = React.useState(false);
	const navigate = useNavigate();
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<>
			<span className='header'>
				<span>
					<span style={{cursor:"pointer"}} onClick={()=>navigate("/products")}>Shop&nbsp;&nbsp;{"  "}</span>
					<span style={{cursor:"pointer"}} onClick={()=>navigate("/products")}>New Arrivals&nbsp;&nbsp;{"  "}</span>
					<span style={{cursor:"pointer"}} onClick={()=>navigate("/products")}>
						Shop by category
						</span>
					{/* <Link to='/'>Home</Link>
					<Link to='/products'>Shop</Link>
					<Link to='/orders'>Orders</Link>
					<Link to='/category'>Categories</Link> */}
				</span>
				<span style={{cursor:"pointer"}} onClick={()=>navigate("/")}>
					<img className='logo'  src={logo} alt='logo' />
				</span>
				<span>
					<span style={{cursor:"pointer"}} className='btn' onClick={() => navigate("/login")}>
						Account
						<PersonOutlineIcon color='red' />
					</span>
					<span style={{cursor:"pointer"}} className='btn'>
						Cart
						<Badge color='primary' variant='dot'>
							<LocalMallOutlinedIcon color='red' />
						</Badge>
					</span>
					<CartModal open={open} handleClose={handleClose} />
				</span>
			</span>
		</>
	);
};
export default Header;
