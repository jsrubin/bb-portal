/* react */
import React from "react";
import { compose, mapProps, branch, renderComponent } from "recompose";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
/* bbp */
import PageNotFound from "components/PageNotFound";
import Layout from "./pages/layout/Layout";
import Login from "./pages/Public/Login";
import Homepage from "./pages/Public/HomepageLayout";
import About from "./pages/Public/About";
import Contact from "./pages/Public/Contact";

/* styles */
import "./App.css";
import "semantic-ui-less/semantic.less";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

export default () => {
  return (
    <Router>
      <StaticRoute>
        <Layout>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/home" exact component={Homepage} />
            <Route path="/about" exact component={About} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/login" exact render={() => <Login show={true} />} />
            <Route path="*" render={() => <PageNotFound />} />
          </Switch>
        </Layout>
      </StaticRoute>
    </Router>
  );
};

/*
 * handle static served content from other than root path '/'
 */
const StaticRoute = compose(
  withRouter,
  mapProps(props => {
    return {
      redirectTo:
        props.location.search && props.location.search.split("=").length > 1
          ? props.location.search.split("=")[1]
          : "",
      ...props
    };
  }),
  branch(
    props => props.redirectTo,
    renderComponent(props => (
      <Redirect
        to={{
          pathname: props.redirectTo,
          state: { from: props.location }
        }}
      />
    ))
  )
)(({ children }) => {
  return <React.Fragment>{children}</React.Fragment>;
});
