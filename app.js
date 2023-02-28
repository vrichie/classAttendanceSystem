var createError = require("http-errors");
var express = require("express");
var path = require("path");

const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const birds = require("./routes/birds");
var indexRouter = require("./routes/posts/index");
var homeRouter = require("./routes/home");
var loginRouter = require("./routes/login/index");
var uploaderRouter = require("./routes/uploader/index");
var usersRouter = require("./routes/users");
var profileRouter = require("./routes/profile");
var app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", homeRouter);
app.use("/api/posts", indexRouter);
app.use("/api/users/", usersRouter);
app.use("/api/profile", profileRouter);
app.use("/api/birds", birds);
app.use("/api/uploader", uploaderRouter);
app.use("/api/login", loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
