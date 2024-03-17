const flash = require("express-flash");
const moment = require("moment");
const cookieParser = require("cookie-parser");
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const database = require("./config/database");

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin//index.route");
const systemConfig = require("./config/system");
database.connect();

const app = express();
const port = process.env.PORT;

//SocketIO
const server = http.createServer(app);
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("a user connected");
});
//End SocketIO
app.use(methodOverride("_method"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", `${__dirname}/views`);

app.set("view engine", "pug");

app.use(cookieParser("tuilaabaoneanhemoi"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;
app.use(express.static(`${__dirname}/public`));

//Routes
route(app);
routeAdmin(app);
app.get("*", (req, res) => {
  res.render("client/pages/errors/404", {
    pageTitle: "404 Note Found",
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
