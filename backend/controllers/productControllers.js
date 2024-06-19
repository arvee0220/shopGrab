import catchAsyncError from "../middlewares/catchAsyncError.js";
import Product from "../models/product.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";

// Get all products
const getProducts = catchAsyncError(async (req, res) => {
	let query = Product.find();

	query = APIFilters(query, req.query);

	try {
		let products = await query;
		let filteredProductsCount = products.length;

		if (!products.length) {
			return res.status(404).json({
				success: false,
				message: "Database is empty",
			});
		}

		res.status(200).json({
			success: true,
			filteredProductsCount,
			products,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

// Get products by ID
const getProductDetails = catchAsyncError(async ({ params: { id } }, res, next) => {
	const product = await Product.findById(id);
	try {
		if (!product) {
			return next(ErrorHandler("Product not found", 404));
		}

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
});

// Create New Product => /api/v1/admin/products
const newProduct = catchAsyncError(async ({ body }, res) => {
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
});

// Update Product
const updateProduct = catchAsyncError(async ({ params: { id }, body }, res) => {
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
});

const deleteProduct = catchAsyncError(async ({ params: { id } }, res) => {
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
});

export { getProducts, newProduct, getProductDetails, updateProduct, deleteProduct };
