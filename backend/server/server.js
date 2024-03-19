import ViteExpress from "vite-express";
import session from "express-session";
import express from "express";
import morgan from "morgan";

// Handlers
import accountHandler from "./accountController.js";

// Server Boilerplate
const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "secretKey",
    saveUninitialized: false,
    resave: false,
  })
);

// Routes

// GET

// POST

// PUT

// DELETE



// Server Startup
const port = 9999;
ViteExpress.listen(app, port, () => console.log(`Server started up at: http://localhost:${port}`))