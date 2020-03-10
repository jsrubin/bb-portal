module.exports.typeDefs = `
    type Query {
        ping: Boolean!
    }
    type Mutation {
        ping: Boolean!
    }

    type Success {
        status: Boolean!
    }
    type Done {
      status: Boolean!
      message: String
    }
`;

module.exports.resolvers = {
  Query: {
    ping: () => true
  },
  Mutation: {
    ping: () => true
  }
};
