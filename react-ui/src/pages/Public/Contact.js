/* react */
import React from "react";
import styled from "@emotion/styled";
import { Grid, Container } from "semantic-ui-react";
/* bbp */
import chemImg from "../../static/biology-doctor-health-4154.png";

const HomeBgImage = styled.div`
  background-color: #1a2224;
  background: url(${props => props.background}) no-repeat;
  background-size: 100%;
  height: 400px;

  /* Add the blur effect */
  filter: blur(8px);
  -webkit-filter: blur(8px);

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  opacity: 0.6;
`;

const CardRow = styled(Grid.Row)`
  margin-left: 50px;
  margin-right: 50px;
  flex-direction: row;
`;

const Heading = styled.span`
  position: absolute;
  top: 20px;
  left: 50px;
  z-index: 2;
  width: 500px;
  color: #fff;
  text-align: left;
  line-height: 1.1em;
  font-family: Poppins, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 44pt;
  font-weight: 400;
  padding-left: 40px;
`;

const HomeInfo = styled(Container)`
  font-family: font-family: Poppins, "Helvetica Neue", Helvetica, Arial, sans-serif; !important;
  font-size: 1.6rem !important;

  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
  color: white;

  position: absolute;
  top: 270px;
  right: -250px;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: left;
`;

const Contact = props => {
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column textAlign="center" verticalAlign="top">
          <HomeBgImage background={chemImg} />
          <Heading>Contact</Heading>
          <HomeInfo text></HomeInfo>
        </Grid.Column>
      </Grid.Row>
      <CardRow columns={2}></CardRow>
    </Grid>
  );
};

export default Contact;
