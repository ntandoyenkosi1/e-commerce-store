const Checkout = () => {
	return (
		<div>
			<h1>Checkout</h1>
			<div>
				<input type='text' placeholder='Enter your name' />
			</div>
			<div>
				<input type='text' placeholder='Address Line 1' />
			</div>
			<div>
				<input type='text' placeholder='Address Line 2' />
			</div>
			<div>
				<input type='text' placeholder='City' />
			</div>
			<div>
				<input type='text' placeholder='Province' />
			</div>
			<div>
				<input type='text' placeholder='Postal code' />
			</div>
			<div>
				<input type='text' placeholder='Country' />
			</div>
      <button>Proceed to Payment</button>
			<h1>Payment</h1>
			<div>
				<input type='text' placeholder='Card Holder Name' />
			</div>
			<div>
				<input type='text' placeholder='Card Number' />
			</div>
			<div>
				<input type='text' placeholder='Expiry Date' />
			</div>
			<div>
				<input type='text' placeholder='CVV' />
			</div>
			<div>
				<button>Pay</button>
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
      <button>Complete Sale</button>
		</div>
	);
};
export default Checkout;
