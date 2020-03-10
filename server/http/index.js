const path = require("path");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const Logger = require("koa-logger");
const serve = require("koa-static");
const mount = require("koa-mount");
const cors = require("@koa/cors");
const api = require("./routes/routes");
const errorHandler = require("./middleware/errorHandler");
const health = require("./routes/health");

const app = new Koa();
const PORT = process.env.PORT || 5000;

app.use(bodyParser());
app.use(Logger());
app.use(cors());

// error handler middleware
app.use(errorHandler);

// routes
// app.use(auth.routes());
app.use(health.routes());
app.use(health.allowedMethods());
app.use(api.routes());
app.use(api.allowedMethods());

const static_pages = new Koa();
static_pages.use(serve(__dirname + "/react-ui/build")); //serve the build directory
static_pages.use(serve(path.resolve(__dirname, "../../react-ui/build"))); //serve the build directory
app.use(mount("/", static_pages));

app.use(async (ctx, next) => {
  if (parseInt(ctx.status) === 404) {
    ctx.status = 200;
    ctx.redirect("/?path=" + ctx.path);
  } else {
    next();
  }
});

// server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
