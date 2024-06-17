import express from "express";
import {
	deleteProduct,
	getProductDetails,
	getProducts,
	newProduct,
	updateProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProductDetails);
router.post("/admin/products", newProduct);
router.patch("/products/:id", updateProduct);
router.delete("/admin/products/:id", deleteProduct);

export default router;
