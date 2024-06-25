import { Router } from "express";
import ViewsController from "../controllers/views.controller.js"
import { authorize } from "../middleware/auth.js";
import generarProductos from "../mocking.js";

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
router.get("/mocking", (req, res) => {
    const productsMocking = [];
    for (let i = 0; i < 100
        ; i++ ){
        productsMocking.push(generarProductos());
    }
    res.send(productsMocking)
})

export default router;
