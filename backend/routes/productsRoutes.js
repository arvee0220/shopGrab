import express from "express";
import {
	deleteProduct,
	getProductDetails,
	getProducts,
	newProduct,
	updateProduct,
} from "../controllers/productControllers.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.get("/products", isAuthenticatedUser, getProducts);
router.get("/products/:id", getProductDetails);

router.post("/admin/products", isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router.patch("/admin/products/:id", isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router.delete("/admin/products/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

export default router;
