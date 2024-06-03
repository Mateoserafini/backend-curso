import { Router } from "express";
import ProductController from "../controllers/product.controller.js";

const productController = new ProductController();
const router = Router();

router.get("/", productController.getProducts);
router.get("/:pid", productController.getProductById);
router.post("/", productController.addProduct);
router.put("/:pid", productController.updateProduct);
router.delete("/:pid", productController.deleteProduct);

export default router;
