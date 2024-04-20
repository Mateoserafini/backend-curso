import express from 'express';

const router = express.Router(); 

router.get("/", async (req, res) => {
    try {
        res.render("chat");
    } catch (error) {
        res.status(500).json({ error: "Error al conectarse al servidor" });
    }
});

export default router;