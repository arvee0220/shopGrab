import express from "express";
import {
	deleteProduct,
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
router.route("/admin/products/:id").delete(deleteProduct);

export default router;
