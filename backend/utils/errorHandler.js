const ErrorHandler = (message, statusCode) => {
	const error = new Error(message);
	error.statusCode = statusCode;

	// Object.setPrototypeOf(error, Object.getPrototypeOf(new Error()));

	if (Error.captureStackTrace) {
		Error.captureStackTrace(error, ErrorHandler);
	}

	return error;
};

export default ErrorHandler;
