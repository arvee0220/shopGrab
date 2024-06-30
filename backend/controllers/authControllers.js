import bcrypt from "bcryptjs";
import catchAsyncErrors from "../middlewares/catchAsyncError.js";
import User from "../models/user.js";
import generateToken from "../utils/jwtToken.js";
import ErrorHandler from "../utils/errorHandler.js";

const registerUser = catchAsyncErrors(async (req, res, next) => {
	const { name, email, password } = req.body;

	const salt = await bcrypt.genSalt(10);

	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	const token = generateToken(user);

	res.status(201).json({
		success: true,
		token,
		user: {
			id: user._id,
			name: user.name,
			email: user.email,
		},
	});

	console.log(token);
});

const getUser = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.params;
	const user = await User.findById(id);

	try {
		if (!user) {
			return next(ErrorHandler("User not found", 404));
		}

		res.status(200).json({
			success: true,
			user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

const loginUser = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email }).select("+password");
	const isPasswordMatched = await bcrypt.compare(password, user.password);

	try {
		switch (true) {
			case !email || !password:
				return next(ErrorHandler("Please enter email & password"));
			case !user:
				return next(ErrorHandler("Invalid email or password", 401));
			case !isPasswordMatched: // Compare user password
				return next(ErrorHandler("Invalid email or password", 401));
			case user && isPasswordMatched:
				const token = generateToken(user);
				return res.status(201).json({
					success: true,
					token,
				});
			default:
				return res.status(500).json({
					success: false,
					message: "Something went wrong",
				});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

export { registerUser, getUser, loginUser };
