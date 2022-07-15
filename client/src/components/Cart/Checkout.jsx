import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
const Checkout = () => {
	return (
		<div>
			<h1>Checkout</h1>
			<div>
			<TextField variant="standard" label="Name" placeholder='Enter your name'/>
				{/* <TextField variant="standard" placeholder='Enter your name' /> */}
			</div>
			<div>
				<TextField variant="standard" label="Address Line 1" placeholder='Address Line 1' />
			</div>
			<div>
				<TextField variant="standard" label="Address Line 2" placeholder='Address Line 2' />
			</div>
			<div>
				<TextField variant="standard" label="City" placeholder='City' />
			</div>
			<div>
				<TextField variant="standard" label="Province/Region" placeholder='Province' />
			</div>
			<div>
				<TextField variant="standard" label="Postal Code" placeholder='Postal code' />
			</div>
			<div>
				<TextField variant="standard" label="Country" placeholder='Country' />
			</div>
      <Button variant="contained" color="secondary">Proceed to Payment</Button>
			<h1>Payment</h1>
			<div>
				<TextField variant="standard" label="Full name" placeholder='Card Holder Name' />
			</div>
			<div>
				<TextField variant="standard" label="Card Number" placeholder='Card Number' />
			</div>
			<div>
				<TextField variant="standard" label="Card expiry date" placeholder='Expiry Date' />
			</div>
			<div>
				<TextField variant="standard" label="CVV" placeholder='CVV' />
			</div>
			<div>
			<Button variant="contained" color="secondary">Pay</Button>
			</div>
			<h1>Summary</h1>
			<h3>Product details</h3>
			<h3>Address details</h3>
			<div>Name</div>
			<div>Address Line 1</div>
			<div>Address Line 2</div>
			<div>City</div>
			<div>Province</div>
			<div>Postal code</div>
			<div>Country</div>
			<h3>Payment details</h3>
			<div>Paid</div>
      <div>Total</div>
      <Button variant="contained" color="secondary">Complete Sale</Button>
		</div>
	);
};
export default Checkout;
