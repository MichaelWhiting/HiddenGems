import ViteExpress from "vite-express";
import session from "express-session";
import express from "express";
import morgan from "morgan";

// Handlers
import handlerFunctions from "./controller.js";

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
app.get("/getUser/:userId", handlerFunctions.getUser);
app.get("/getFriends/:userId", handlerFunctions.getFriends);
app.get("/getPost/:postId", handlerFunctions.getPost);
app.get("/getPost", handlerFunctions.getAllPost);

app.get("/getComments/:postId", handlerFunctions.getComments);
app.get("/getRatings/:postId", handlerFunctions.getRatings);
app.get('/session-check', handlerFunctions.sessionCheck);
app.get("/logout", handlerFunctions.logout);

// POST
app.post("/login", handlerFunctions.login);
app.post("/register", handlerFunctions.register);
// PUT

// DELETE



// Server Startup
const port = 9998;
ViteExpress.listen(app, port, () => console.log(`Server started up at: http://localhost:${port}`));
