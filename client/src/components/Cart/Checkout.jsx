import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
function Copyright() {
	return (
		<Typography variant='body2' color='text.secondary' align='center'>
			{"Copyright © "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step) {
	switch (step) {
		case 0:
			return <AddressForm />;
		case 1:
			return <PaymentForm />;
		case 2:
			return <Review />;
		default:
			throw new Error("Unknown step");
	}
}

const theme = createTheme();

export default function Checkout() {
	const navigate=useNavigate()
	const { user } = useContext(UserContext)
	
	const [activeStep, setActiveStep] = React.useState(0);
	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};
	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};
	const handleCheckout = () => {
		var products = JSON.parse(localStorage.getItem("cart"));
		//const user = JSON.parse(localStorage.getItem("data"));
		console.log(user, "user")
		var ids = [];
		products.forEach((item) => {
			for (var i = 0; i < item.quantity; i++) {
				ids.push(item.product._id);
			}
		});
		var myHeaders = new Headers();
		var token = localStorage.getItem("token");
		myHeaders.append("x-auth-token", token);
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			product: ids,
			quantity: 1,
			price: 100,
			user: user.id,
		});

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch("http://localhost:3001/api/sales", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.ok) {
					localStorage.removeItem("cart");
					return handleNext();
				}
			})
			.catch((error) => console.log("error", error));
	};
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppBar
				position='absolute'
				color='default'
				elevation={0}
				sx={{
					position: "relative",
					borderBottom: (t) => `1px solid ${t.palette.divider}`,
				}}
			></AppBar>
			<Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
				<Paper
					variant='outlined'
					sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
				>
					<Typography component='h1' variant='h4' align='center'>
						Checkout
					</Typography>
					<Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<React.Fragment>
						{activeStep === steps.length ? (
							<React.Fragment>
								<Typography variant='h5' gutterBottom>
									Thank you for your order.
								</Typography>
								<Typography variant='subtitle1'>
									We have
									emailed your order confirmation, and will
									send you an update when your order has
									shipped.
								</Typography>
								<button onClick={()=>navigate(`/orders/${user.id}`)}>View Orders</button>
							</React.Fragment>
						) : (
							<React.Fragment>
								{getStepContent(activeStep)}
								<Box
									sx={{
										display: "flex",
										justifyContent: "flex-end",
									}}
								>
									{activeStep !== 0 && (
										<Button
											onClick={handleBack}
											sx={{ mt: 3, ml: 1 }}
										>
											Back
										</Button>
									)}
									{activeStep === steps.length - 1 ? (
										<Button
											onClick={handleCheckout}
											variant='contained'
											sx={{ mt: 3, ml: 1 }}
										>
											Place order
										</Button>
									) : (
										<Button
											variant='contained'
											onClick={handleNext}
											sx={{ mt: 3, ml: 1 }}
										>
											Next
										</Button>
									)}
								</Box>
							</React.Fragment>
						)}
					</React.Fragment>
				</Paper>
				<Copyright />
			</Container>
		</ThemeProvider>
	);
}
