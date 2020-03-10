import React from "react";
import { compose, defaultProps, withState, mapProps } from "recompose";
import { themes } from "../themes";
import configs from "../conf/config.json";

// const { Provider, Consumer } = React.createContext({});
export const AppContext = React.createContext({});

export const context = () => AppContext;

export const withAppContext = BaseComponent => props => {
  return (
    <AppContext.Consumer>
      {context => <BaseComponent {...props} context={context} />}
    </AppContext.Consumer>
  );
};

export const withAuthContext = BaseComponent => props => {
  return (
    <AppContext.Consumer>
      {({ isAuthenticated, onAuthenticate }) => (
        <BaseComponent
          {...props}
          isAuthenticated={isAuthenticated}
          onAuthenticate={onAuthenticate}
        />
      )}
    </AppContext.Consumer>
  );
};

export const withLoginModalContext = BaseComponent => props => {
  return (
    <AppContext.Consumer>
      {({ loginModalOpen, toggleLoginModal }) => (
        <BaseComponent
          {...props}
          loginModalOpen={loginModalOpen}
          toggleLoginModal={toggleLoginModal}
        />
      )}
    </AppContext.Consumer>
  );
};

const AppContextProvider = props => {
  return (
    <AppContext.Provider value={props}>{props.children}</AppContext.Provider>
  );
};

export default compose(
  defaultProps({
    msg: "Hello Context!",
    themes,
    configs
  }),
  withState("theme", "onSetTheme", "normal"),
  withState("isAuthenticated", "onAuthenticate", false),
  withState("loginModalOpen", "toggleLoginModal", false),
  mapProps(props => {
    return {
      ...props.configs,
      ...props
    };
  })
)(AppContextProvider);
