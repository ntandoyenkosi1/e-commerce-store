import { Link, useNavigate } from "react-router-dom";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import React, { useContext, useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import logo from "../../assets/donut.png";
import UserContext from "../../context/UserContext";
import CartModal from "../Cart/CartModal";
const Header = ({cart, setCart}) => {
	const { user, setUser } = useContext(UserContext);
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	if (!user) {
		try {
			const user = JSON.parse(localStorage.getItem("data"));
			const token = localStorage.getItem("token");
			if (token) {
				setUser(user);
			}
		}
		catch { }
	}
	return (
		<div className='center'>
			<header>
				<div
					style={{ cursor: "pointer" }}
					onClick={() => navigate("/")}
				>
					<img className='logo' src={logo} alt='logo' />
				</div>
				<div
					style={{ cursor: "pointer" }}
					onClick={() => navigate("/products")}
				>
					Shop&nbsp;&nbsp;{"  "}
				</div>
				<div>
					<select
						id='dropdown'
						className="mySelect"
						onChange={() => {
							navigate(document.getElementById("dropdown").value);
						}}
					>
						<option value=''>...</option>
						{!user && (
							<>
								<option value='login'>Login</option>
								<option value='sign-up'>Register</option>
							</>
						)}
						{user && (
							<>
								<option value='profile'>Profile</option>
								{user && user.id && user.roles.includes(`client`) && (
									<option value={`orders/${user.id}`}>Your Orders</option>
								)}
								{user && user._id && user.roles.includes(`client`) && (
									<option value={`orders/${user._id}`}>Your Orders</option>
								)}
								{user && user.roles.includes("admin") && (
									<>
										<option value='orders'>
											Manage Orders
										</option>
										<option value='users'>
											Manage Users
										</option>
										<option value='category'>
											Manage Categories
										</option>
									</>
								)}
								<option value='logout'>Logout</option>
							</>
						)}
					</select>
					<div
						style={{ cursor: "pointer" }}
						className='btn'
						onClick={() => handleOpen()}
					>
						Cart
						<Badge
							color='primary'
							anchorOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							variant='dot'
						>
							<LocalMallOutlinedIcon color='red' />
						</Badge>
					</div>
				</div>
			</header>
			<CartModal open={open} handleClose={handleClose} cart={cart} setCart={setCart}/>
		</div>
	);
};
export default Header;
