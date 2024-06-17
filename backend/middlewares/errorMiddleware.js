import ErrorHandler from "../utils/errorHandler.js";

const ErrorMiddleware = (err, _, res, __) => {
	let error = { ...err };
	error.message = err.message || "Internal Server Error";
	error.statusCode = err.statusCode || 500;

	if (process.env.NODE_ENV === "DEVELOPMENT") {
		res.status(error.statusCode).json({
			success: false,
			message: error.message,
			error: err,
			stack: err?.stack,
		});
	}

	if (process.env.NODE_ENV === "PRODUCTION") {
		res.status(error.statusCode).json({
			success: false,
			message: error.message,
		});
	}

	// Handle Invalid Mongoose ID error
	if (err.name === "CastError") {
		const message = `Resource not found ${err?.path}`;
		error = ErrorHandler(message, 404);
	}

	// Handle Validation Error
	if (err.name === "ValidationError") {
		const message = Object.values(err.errors).map((value) => value.message);
		error = ErrorHandler(message, 400);
	}

	return res.status(error.statusCode).json({
		success: false,
		message: error.message,
	});
};

export default ErrorMiddleware;
