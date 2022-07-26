import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../Layout/Loading";
const Logout = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		navigate("/login");
	};
	return (
		<div className='center'>
			<div>
				<div>
					<DeleteIcon color='secondary' fontSize='large' />
				</div>
				<h1>Delete Product</h1>
			</div>
			<div>You will be logged out of this application</div>
			<div>Select one of the following options below.</div>
			<Button
				variant='contained'
				title='Logout of this application'
				color='secondary'
				onClick={handleLogout}
			>
				<SaveOutlinedIcon />
				Confirm
			</Button>
			<Button
				variant='contained'
				title='Cancel logout. Return to previous page'
				color='secondary'
				onClick={() => navigate(-1)}
			>
				<CancelOutlinedIcon />
				Cancel
			</Button>
		</div>
	);
};
export default Logout;
