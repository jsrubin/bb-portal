import React from "react";
import { createTheming } from "@callstack/react-theme-provider";
import { withAppContext } from "./AppContextProvider";
import { themes } from "../themes";
import { compose } from "recompose";
const { ThemeProvider, withTheme } = createTheming(themes);

export { withTheme as withAppTheme };

const Theme = ({ context, children }) => {
  return (
    <ThemeProvider theme={themes[context.theme]}>{children}</ThemeProvider>
  );
};

export default compose(withAppContext)(Theme);
