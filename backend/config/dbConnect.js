import mongoose from "mongoose";

const connectDatabase = async () => {
	let DB_URI = "";

	if (process.env.NODE_ENV === "DEVELOPMENT") DB_URI = process.env.DB_LOCAL_URI;
	if (process.env.NODE_ENV === "PRODUCTION") DB_URI = process.env.DB_URI;

	try {
		const con = await mongoose.connect(DB_URI);
		console.log(`MongoDB Database connected with HOST: ${con?.connection?.host}`);
	} catch (error) {
		console.error(`Error connecting to MongoDB: ${error.message}`);
	}
};

export { connectDatabase };
