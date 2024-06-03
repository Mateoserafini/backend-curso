import { Router } from "express";
import ViewsController from "../controllers/views.controller.js"

const viewsController = new ViewsController()

const router = Router();

router.get("/", viewsController.home);
router.get("/realtimeproducts", viewsController.realtimeproducts);
router.get("/chat", viewsController.chat);
router.get("/products", viewsController.products);
router.get("/carts/:cid", viewsController.cart);
router.get("/login", viewsController.login);
router.get("/register", viewsController.register);
router.get("/profile", viewsController.profile);

export default router;
