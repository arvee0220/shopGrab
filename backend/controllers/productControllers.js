import Product from "../models/product.js";

const getProducts = async (_, res) => {
	res.status(200).json({
		message: `All Products`,
	});
};

// Create New Product => /api/v1/admin/products
const newProduct = async (req, res) => {
	const product = await Product.create(req.body);

	res.status(200).json({
		product,
	});
};

export { getProducts, newProduct };
