import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const isAuthenticatedUser = catchAsyncError(async (req, _, next) => {
	const { token } = req.cookies;

	if (!token) {
		return next(ErrorHandler("Login first to access this resource", 401));
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	console.log(decoded);

	req.user = await User.findById(decoded.id);

	next();
});

const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`, 403)
			);
		}

		next();
	};
};

export { isAuthenticatedUser, authorizeRoles };
