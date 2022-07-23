import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const ErrorOccured = () => {
	const navigate = useNavigate();
	return (
		<div>
			<div>
				<ErrorOutlineIcon color='secondary' fontSize='large' />
			</div>
			<h1>An internal error occured</h1>
			<h4>These are the possible issues</h4>
			<p>1. The operation you were performing was not successful.</p>
			<Button
				onClick={() => navigate(-1)}
				title='Go back to previous page'
      >
        <ArrowBackIcon />
				Go Back
			</Button>
		</div>
	);
};
export default ErrorOccured;
