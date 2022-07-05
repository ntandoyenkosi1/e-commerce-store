const EditProduct = () => {
	return (
		<>
			<div>
				<h1>Edit Product</h1>
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
					<span>Update product image</span>
				</div>
				<input type='file' />
				<div>
					<input type='text' id='image' placeHolder='Product Link' />
				</div>
				<select>
					<option></option>
					<option>Category 1</option>
					<option>Category 2</option>
					<option>Category 3</option>
        </select>
        <div>
        <button disabled>Save Changes</button>
          <button>Cancel</button>
          </div>
			</div>
		</>
	);
};
export default EditProduct;
