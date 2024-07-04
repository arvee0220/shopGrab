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

	console.log("Authenticated User:", req.user);

	next();
});

const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!req.user) {
			return next(ErrorHandler("User is not authenticated", 401));
		}

		if (!roles.includes(req.user.role)) {
			return next(
				ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`, 403)
			);
		}

		console.log("User Role:", req.user.role);

		next();
	};
};

export { isAuthenticatedUser, authorizeRoles };
