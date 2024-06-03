import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import "./database.js";
import "dotenv/config";
import routerProduct from "./routes/products.router.js";
import routerViews from "./routes/views.router.js";
import cartRouter from "./routes/cart.router.js";
import socketProducts from "./sockets/realtimeproducts.socket.js";
import socketChat from "./sockets/chat.socket.js";
import userRouter from "./routes/user.router.js";
import sessionsRouter from "./routes/user.router.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(
  session({
    secret: "12345678",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://matuserafini:45089673@cluster0.frnygq1.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0",
      ttl: 15,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
initializePassport();

app.use("/api/users", userRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/products", routerProduct);
app.use("/api/carts", cartRouter);
app.use("/", routerViews);

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando en http://localhost:${PORT}`);
});

const socketServer = new Server(httpServer);

socketProducts(socketServer);
socketChat(socketServer);
