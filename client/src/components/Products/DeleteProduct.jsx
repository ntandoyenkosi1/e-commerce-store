const DeleteProduct = () => {
	return (
		<>
			<div>
				<h1>Delete Product</h1>
			</div>
			<div>The following product with these details will be deleted:</div>
			<div>
				<input
					type='text'
					id='name'
					disabled
					placeHolder='Product Name'
				/>
			</div>
			<div>
				<input type='text' id='price' disabled placeHolder='Price' />
			</div>
			<div>
				<input
					type='text'
					id='description'
					disabled
					placeHolder='Description'
				/>
			</div>
			<div>
				<input
					disabled
					type='text'
					id='image'
					placeHolder='Product Link'
				/>
			</div>
			<div>
			<select disabled>
				<option></option>
				<option>Category 1</option>
				<option>Category 2</option>
				<option>Category 3</option>
				</select>
				</div>
			<button>Confirm Delete</button>
			<button>Cancel</button>
		</>
	);
};
export default DeleteProduct;
