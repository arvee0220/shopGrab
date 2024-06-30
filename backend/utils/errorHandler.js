const ErrorHandler = (message, statusCode) => {
	const error = new Error(message);
	error.statusCode = statusCode;

	if (Error.captureStackTrace) {
		Error.captureStackTrace(error, ErrorHandler);
	}

	return error;
};

export default ErrorHandler;