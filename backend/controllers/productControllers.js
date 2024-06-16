import Product from "../models/product.js";

const getProducts = async (_, res) => {
	const products = await Product.find();

	res.status(200).json({
		products,
	});
};

// Create New Product => /api/v1/admin/products
const newProduct = async (req, res) => {
	const product = await Product.create(req.body);

	res.status(200).json({
		product,
	});
};

const getProductDetails = async (req, res) => {
	console.log(req.params);
	const product = await Product.findById(req.params.id);

	res.status(200).json({
		product,
	});
};

export { getProducts, newProduct, getProductDetails };
