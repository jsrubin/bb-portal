import React from "react";
import { withAppContext } from "../provider/AppContextProvider";
import { compose, withState } from "recompose";
import styled from "@emotion/styled";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

// const ThemeSelector = props => {
//   return (
//     <select onChange={e => props.context.onSetTheme(e.target.value)}>
//       {Object.keys(props.context.themes).map(themeName => (
//         <option key={themeName} value={themeName}>
//           {themeName}
//         </option>
//       ))}
//     </select>
//   );
// };

const StyledDrop = styled(Dropdown)``;

const BootSelector = props => {
  return (
    <StyledDrop
      block={true}
      isOpen={props.dropdownOpen}
      toggle={e => {
        props.toggle(!props.dropdownOpen);
        if (e.target.value) {
          props.context.onSetTheme(e.target.value);
        }
      }}
    >
      <DropdownToggle color="primary" size="sm" caret>
        {props.context.theme}
      </DropdownToggle>
      <DropdownMenu>
        {Object.keys(props.context.themes).map(themeName => (
          <DropdownItem key={themeName} value={themeName}>
            {themeName}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </StyledDrop>
  );
};

export default compose(
  withState("dropdownOpen", "toggle", false),
  withAppContext
)(BootSelector);

// export default compose(withAppContext)(ThemeSelector);
