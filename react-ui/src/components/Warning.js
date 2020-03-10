import React from "react";
import styled from "@emotion/styled";

export const StyledWarningTitle = styled.h4`
  color: red;
`;

export const StyledWarningDetails = styled.span`
  color: red;
`;

const Warning = ({ warningMsg }) => {
  return <h2>{warningMsg}</h2>;
};

export const WarningMessageComponent = ({ title, details }) => {
  return (
    <div>
      <StyledWarningTitle>{title}</StyledWarningTitle>
      <StyledWarningDetails>{details}</StyledWarningDetails>
    </div>
  );
};

export default Warning;
