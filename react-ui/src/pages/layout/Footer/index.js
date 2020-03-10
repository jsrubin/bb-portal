import React from "react";
import styled from "@emotion/styled";
import { withAppTheme } from "../../../provider/ThemeProvider";
import { Grid, Image, Responsive } from "semantic-ui-react";
import biobidfootimg from "../../../static/biobidportal-whiteonblue-footer.png";
import pack from "../../../../package.json";

const StyledFooterGrid = styled(Grid)`
  height: 100px;
  font-size: 0.8rem;
  background-color: ${props =>
    props && props.theme ? props.theme.siteHeaderBackgroundColor : "darkgrey"};
  color: ${props =>
    props && props.theme ? props.theme.siteHeaderColor : "#fff"};
`;

const StyledLink = styled.a`
  text-decorate: none;
  color: ${props =>
    props && props.theme ? props.theme.siteHeaderColor : "#fff"};

  /* unvisited link */
  :link {
    color: #fff;
  }

  /* visited link */
  :visited {
    color: #fff;
  }

  /* mouse over link */
  :hover {
    color: #fff;
  }

  /* selected link */
  :active {
    color: #fff;
  }
`;

const ResponsiveFooterRow = styled(Responsive)`
  background-color: #002657;
  font-size: ${props => (props.ismobile ? "0.7rem" : "0.8rem")};
`;

const StyledImage = styled(Image)`
  height: 20px;
`;

const Footer = props => {
  return (
    <React.Fragment>
      <StyledFooterGrid {...props} centered>
        <ResponsiveFooterRow
          minWidth={768}
          as={Grid.Row}
          verticalAlign={"middle"}
        >
          <Grid.Column width={2}>
            <StyledImage src={biobidfootimg} />
          </Grid.Column>
          <Grid.Column width={3}>
            © Copyright 2020&nbsp;
            <StyledLink href="http://www.bbportal.com">
              BB Portal, Inc
            </StyledLink>
          </Grid.Column>
          <Grid.Column width={1}>v.{pack.version}</Grid.Column>
        </ResponsiveFooterRow>
        <ResponsiveFooterRow
          ismobile={"true"}
          {...Responsive.onlyMobile}
          as={Grid.Row}
          verticalAlign={"middle"}
        >
          <Grid.Column width={10}>
            © Copyright 2020&nbsp;
            <StyledLink href="http://www.bbportal.com">
              BB Portal, Inc
            </StyledLink>
          </Grid.Column>
          <Grid.Column width={4}>v.{pack.version}</Grid.Column>
        </ResponsiveFooterRow>
      </StyledFooterGrid>
    </React.Fragment>
  );
};

export default withAppTheme(Footer);
