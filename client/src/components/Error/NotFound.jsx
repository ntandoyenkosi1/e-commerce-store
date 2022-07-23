import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
const NotFound = () => {
	return (
		<div>
			<div>
				<ErrorOutlineIcon color='secondary' fontSize='large' />
			</div>
			<h1>Page not found</h1>
			<h4>These are the possible issues</h4>
			<p>1. This page does not exist.</p>
			<p>2. You do not have permission to view this page.</p>
		</div>
	);
};
export default NotFound;
