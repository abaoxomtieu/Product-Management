const flash = require('express-flash');
const cookieParser = require('cookie-parser')
const express = require("express");
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')

require("dotenv").config();

const database = require("./config/database");

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin//index.route");
const systemConfig = require("./config/system");
database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set("views", "./views");

app.set("view engine", "pug");

app.use(cookieParser('tuilaabaoneanhemoi'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());


// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static("public"));

//Routes
route(app);
routeAdmin(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
