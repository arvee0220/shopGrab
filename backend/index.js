import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/dbConnect.js";
import ErrorMiddleware from "./middlewares/errorMiddleware.js";
// Routes
import productRoutes from "./routes/products.js";

const app = express();

dotenv.config({ path: "backend/config/config.env" });

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
	console.log(`ERR: ${err}`);
	console.log("Shutting down server due to uncaught exceptions");
	process.exit(1);
});

// Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
	console.log(`ERROR: ${err}`);
	console.log("Shutting down server due to unhandled promise rejection");
	server.close(() => {
		process.exit(1);
	});
});

// Connect to Database
connectDatabase();

app.use(express.json());

app.use("/api/v1", productRoutes);

// Error middleware
app.use(ErrorMiddleware);

const port = process.env.PORT;

const server = app.listen(port, () => {
	console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
