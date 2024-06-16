import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/dbConnect.js";
// Routes
import productRoutes from "./routes/products.js";

const app = express();

dotenv.config({ path: "backend/config/config.env" });

// Connect to Database
connectDatabase();

app.use("/api/v1", productRoutes);

app.listen(process.env.PORT, () => {
	console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
