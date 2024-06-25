import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import "./database.js";
import "dotenv/config";
import routerProduct from "./routes/products.router.js";
import routerViews from "./routes/views.router.js";
import cartRouter from "./routes/cart.router.js";
import ticketRoutes from './routes/ticket.router.js';
import socketProducts from "./sockets/realtimeproducts.socket.js";
import socketChat from "./sockets/chat.socket.js";
import userRouter from "./routes/user.router.js";
import sessionsRouter from "./routes/user.router.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./libs/passport.js";
import configObject from "./config/config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const hbs = handlebars.create({
  helpers: {
    multiply: (a, b) => a * b,
    calculateTotal: (products) => products.reduce((total, product) => total + (product.quantity * product.product.price), 0)
  }
});

app.engine("handlebars", hbs.engine);
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(
  session({
    secret: configObject.secret,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: configObject.mongoURL,
      ttl: 3600, // 1 hora
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
initializePassport();

app.use("/api/users", userRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/products", routerProduct);
app.use("/api/carts",cartRouter);
app.use('/api/tickets', ticketRoutes);
app.use("/", routerViews);

const httpServer = app.listen(configObject.PORT, () => {
  console.log(`Escuchando en http://localhost:${configObject.PORT}`);
});

const socketServer = new Server(httpServer);
socketProducts(socketServer);
socketChat(socketServer);
