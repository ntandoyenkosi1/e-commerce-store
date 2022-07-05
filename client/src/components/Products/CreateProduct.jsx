const CreateProduct = () => {
	return (
		<>
			<div>
				<h1>Add a new Product</h1>
				<div>
					<input type='text' id='name' placeHolder='Product Name' />
				</div>
				<div>
					<input type='text' id='price' placeHolder='Price' />
				</div>
				<div>
					<input
						type='text'
						id='description'
						placeHolder='Description'
					/>
				</div>
				<div>
					<span>Upload product image</span>
					<input type='file' />
				</div>
				<div>
					<input type='text' id='image' placeHolder='Product Link' />
				</div>
				<select>
					<option></option>
					<option>Category 1</option>
					<option>Category 2</option>
					<option>Category 3</option>
				</select>
			</div>
		</>
	);
};
export default CreateProduct;
