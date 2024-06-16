import { Router } from "express";
import ViewsController from "../controllers/views.controller.js"
import { authorize } from "../middleware/auth.js";

const viewsController = new ViewsController()

const router = Router();

router.get("/", viewsController.home);
router.get("/realtimeproducts", authorize("admin"), viewsController.realtimeproducts);
router.get("/chat", authorize("user"), viewsController.chat);
router.get("/products", authorize("user"), viewsController.products);
router.get("/carts/:cid", viewsController.cart);
router.get("/login", viewsController.login);
router.get("/register", viewsController.register);
router.get("/profile", viewsController.profile);

export default router;
