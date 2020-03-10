import React from "react";
import styled from "@emotion/styled";

const SpinnerPlacement = styled.div`
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100px;
  height: 100px;
`;

const Loader = () => {
  return (
    <SpinnerPlacement>
      <i className="fas fa-spinner" />
    </SpinnerPlacement>
  );
};

export default Loader;
