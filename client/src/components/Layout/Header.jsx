import { Link, useNavigate } from "react-router-dom";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import React, { useContext } from "react";
import Badge from "@mui/material/Badge";
import CartModal from "../Cart/CartModal";
import logo from "../../assets/donut.png";
import UserContext from "../../context/UserContext";
const Header = () => {
	const { user, setUser } = useContext(UserContext);
	const [open, setOpen] = React.useState(false);
	if (!user) {
		try {
			const user = JSON.parse(localStorage.getItem("data"));
			const token = localStorage.getItem("token");
			console.log(user, token);
		if (token) {
			setUser(user);
		}
		}
		catch{}
	}
	const navigate = useNavigate();
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<div className='center'>
			<span className='header'>
				<span>
					<span
						style={{ cursor: "pointer" }}
						onClick={() => navigate("/products")}
					>
						Shop&nbsp;&nbsp;{"  "}
					</span>
					<span
						style={{ cursor: "pointer" }}
						onClick={() => navigate("/products")}
					>
						New Arrivals&nbsp;&nbsp;{"  "}
					</span>
					<span
						style={{ cursor: "pointer" }}
						onClick={() => navigate("/products")}
					>
						Shop by category
					</span>
				</span>
				<span
					style={{ cursor: "pointer" }}
					onClick={() => navigate("/")}
				>
					<img className='logo' src={logo} alt='logo' />
				</span>
				<span>
					
				</span>
				<span>
					{/* {user != null && user.email ? (
						<>
							<span
								style={{ cursor: "pointer" }}
								className='btn'
								onClick={() => navigate("/profile")}
							>
								Profile
								<PersonOutlineIcon color='red' />
							</span>
						</>
					) : (
						<>
							<span
								style={{ cursor: "pointer" }}
								className='btn'
								onClick={() => navigate("/login")}
							>
								Account
								<PersonOutlineIcon color='red' />
							</span>
						</>
					)} */}
					<select
						id='dropdown'
						className="mySelect"
						onChange={() => {
							navigate(document.getElementById("dropdown").value);
						}}
					>
						<option value=''>...</option>
						{user == null && (
							<>
								<option value='login'>Login</option>
								<option value='sign-up'>Register</option>
							</>
						)}
						{user != null && (
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
					<span
						onClick={() => handleOpen()}
						style={{ cursor: "pointer" }}
						className='btn'
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
					</span>
					<CartModal open={open} handleClose={handleClose} />
				</span>
			</span>
		</div>
	);
};
export default Header;
