import bcrypt from "bcryptjs";
import catchAsyncErrors from "../middlewares/catchAsyncError.js";
import User from "../models/user.js";
import generateToken from "../utils/jwtToken.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";

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

	sendToken(user, 201, res);

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
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
			},
		});

		sendToken(user, 200, res);
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
				return sendToken(user, 201, res);
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

const logOutUser = catchAsyncErrors(async (req, res, next) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({
		message: "Logged Out",
	});
});

export { registerUser, getUser, loginUser, logOutUser };
