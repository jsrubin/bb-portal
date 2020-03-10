"use strict";

const Router = require("koa-router");
const koaBody = require("koa-bodyparser");
const { graphqlKoa, graphiqlKoa } = require("apollo-server-koa");
const GraphQLStitch = require("../../graphql/index.js");
const schema = new GraphQLStitch("schema");

let router = new Router({
  prefix: "/api"
});

router.post(
  "/graphql",
  koaBody(),
  graphqlKoa(context => ({
    schema,
    context
  }))
);

router.get(
  "/graphql",
  graphqlKoa(context => ({ schema, context }))
);

router.get(
  "/graphiql",
  graphiqlKoa(context => ({
    endpointURL: "/api/graphql",
    context
  }))
);

module.exports = router;
