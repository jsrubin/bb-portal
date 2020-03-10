import React from "react";
import { nest } from "recompose";
import ApolloClient, { client } from "./apollo";
import { ApolloProvider } from "@apollo/react-hooks";
import AppContextProvider from "./provider/AppContextProvider";
import { themes } from "themes";
import ThemeProvider from "./provider/ThemeProvider";

const pathTenant = document.location.pathname.split("/")[1]
  ? document.location.pathname.split("/")[1]
  : "";

const Providers = nest(
  ({ children }) => <ApolloClient children={children} />,
  ({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider>,
  ({ children }) => (
    <AppContextProvider pathTenant={pathTenant} children={children} />
  ),
  ({ children }) => <ThemeProvider children={children} themes={themes} />
);

Providers.displayName = "AppProvider(Composed)";

const AppProvider = ({ children }) => <Providers children={children} />;

export { AppProvider as Provider };
