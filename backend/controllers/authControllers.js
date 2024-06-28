import bcrypt from "bcryptjs";
import catchAsyncErrors from "../middlewares/catchAsyncError.js";
import User from "../models/user.js";

const registerUser = catchAsyncErrors(async (req, res, next) => {
	const { name, email, password } = req.body;

	const salt = await bcrypt.genSalt(10);

	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	res.status(201).json({
		success: true,
	});
});

export { registerUser };
