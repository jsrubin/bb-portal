import { withProps } from "recompose";
import ApolloClient from "apollo-boost";
import { withClientState } from "apollo-link-state";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache, defaultDataIdFromObject } from "apollo-cache-inmemory";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all"
  },
  query: {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all"
  },
  mutate: {
    errorPolicy: "all"
  }
};

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case "Configs":
        return object.key;
      case "Capabilities":
        return object.key;
      default:
        return defaultDataIdFromObject(object); // fall back to default handling
    }
  }
});

const stateLink = withClientState({ cache });

const client = new ApolloClient({
  uri: process.env.GRAPHQL_URI || "/api/graphql",
  fetchOptions: {
    credentials: "include"
  },
  cache,
  clientState: stateLink
});

client.defaultOptions = defaultOptions;

export { client };

export default withProps({ client })(ApolloProvider);
