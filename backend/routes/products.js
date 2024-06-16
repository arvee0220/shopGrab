import express from "express";
import {
	getProductDetails,
	getProducts,
	newProduct,
	updateProduct,
} from "../controllers/productControllers.js";
const router = express.Router();

router.route("/products").get(getProducts);
router.route("/products/:id").get(getProductDetails);
router.route("/admin/products").post(newProduct);
router.route("/products/:id").patch(updateProduct);

export default router;
