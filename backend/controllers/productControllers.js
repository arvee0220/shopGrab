import Product from "../models/product.js";

// Get all products
const getProducts = async (_, res) => {
	const products = await Product.find();
	try {
		if (!products) {
			return res.status(404).json({
				success: false,
				message: "Database is empty",
			});
		}

		res.status(200).json({
			success: true,
			products,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Get products by ID
const getProductDetails = async (req, res) => {
	console.log(req.params);
	const product = await Product.findById(req.params.id);

	if (!product) {
		return res.status(404).json({
			success: false,
			message: "Product not found",
		});
	}

	res.status(200).json({
		product,
	});
};

// Create New Product => /api/v1/admin/products
const newProduct = async ({ body }, res) => {
	const product = await Product.create(body);
	try {
		res.status(200).json({
			success: true,
			product,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Update Product
const updateProduct = async ({ params: { id }, body }, res) => {
	let product = await Product.findById(id);

	try {
		if (!product) {
			return res.status(404).json({
				error: "Product not found",
			});
		}

		product = await Product.findByIdAndUpdate(id, body, {
			new: true,
		});

		res.status(200).json({
			success: true,
			product,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const deleteProduct = async ({ params: { id } }, res) => {
	const product = await Product.findById(id);

	try {
		if (!product) {
			return res.status(404).json({
				error: "Product not found",
			});
		}

		await product.deleteOne();

		const name = product.name;

		res.status(200).json({
			success: true,
			message: `Product ${name} deleted`,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export { getProducts, newProduct, getProductDetails, updateProduct, deleteProduct };
