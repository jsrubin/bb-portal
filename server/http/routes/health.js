const Router = require("koa-router");
let health = new Router({
  prefix: "/fn"
});

health.get("/ecv", async (ctx, next) => "OK");

health.get("/info", async (ctx, next) => {
  ctx.body = {
    status: "OK GO!"
  };
});

module.exports = health;
