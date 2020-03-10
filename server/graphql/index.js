const path = require("path");
const { map, merge } = require("lodash");
const { makeExecutableSchema } = require("graphql-tools");

module.exports = class GraphQLStitch {
  constructor(dir) {
    this.schemaDir = __dirname + "/" + dir;
    this.schemaFiles = this.readSchemaFiles();

    return makeExecutableSchema({
      typeDefs: this.mapTypeDefs(),
      resolvers: merge(this.mapResolvers())
    });
  }

  readSchemaFiles() {
    const dir = this.schemaDir;
    const schemaFiles = {};

    /* Read all schema files in a given directory */
    require("fs")
      .readdirSync(dir)
      .forEach(function(file) {
        schemaFiles[path.basename(file, ".js")] = require(path.join(dir, file));
      });
    return schemaFiles;
  }

  mapTypeDefs() {
    return map(this.schemaFiles, value => {
      return value.typeDefs;
    });
  }

  mapResolvers() {
    return map(this.schemaFiles, value => {
      return value.resolvers;
    });
  }
};
