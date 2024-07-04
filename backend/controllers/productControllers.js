import catchAsyncError from "../middlewares/catchAsyncError.js";
import Product from "../models/product.js";
import apiFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";

// Get all products
const getProducts = catchAsyncError(async (req, res) => {
	const resPerPage = 4;

	let queryObj = Product.find();

	const { search, filters, pagination } = apiFilters(queryObj, req.query);

	queryObj = search(queryObj);
	queryObj = filters(queryObj);
	queryObj = pagination(queryObj, resPerPage);

	console.log("req?.user", req?.user);

	try {
		let products = await queryObj;
		let filteredProductsCount = products.length;

		if (!products.length) {
			return res.status(404).json({
				success: false,
				message: "Database is empty",
			});
		}

		res.status(200).json({
			success: true,
			resPerPage,
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
const newProduct = catchAsyncError(async ({ body, user }, res) => {
	body.user = user._id;

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
