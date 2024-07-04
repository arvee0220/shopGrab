import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "backend/config/config.env" });

const testToken = () => {
	const secretKey = process.env.JWT_SECRET;
	const payload = { id: "input user string id" }; // Sample payload

	const token = jwt.sign(payload, secretKey, {
		expiresIn: "7d",
	});

	console.log(token);

	console.log(process.env.JWT_SECRET);
};

testToken();
