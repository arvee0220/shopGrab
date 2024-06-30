import bcrypt from "bcryptjs";
import catchAsyncErrors from "../middlewares/catchAsyncError.js";
import User from "../models/user.js";
import generateToken from "../utils/jwtToken.js";

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

	res.status(200).json({
		success: true,
		user,
	});
});

export { registerUser, getUser };
