/* react */
import React from "react";
import styled from "@emotion/styled";
import {
  Header,
  Grid,
  Container,
  Card,
  Image,
  Responsive
} from "semantic-ui-react";
/* bbp */
import chartsImg from "../../static/chart-data-desk-590022.png";
import chemImg from "../../static/biology-doctor-health-4154.png";

const GridBody = styled(Grid.Column)`
  :after {
    content: "";
    display: inline-block;
    background: url(${props => props.background}) no-repeat;
    background-size: 100%;
    opacity: 0.6;
  }
`;

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

const TextContainer = styled(Container)`
  font-family: frank-new, "Roboto", -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol" !important;
  font-size: 1.9rem !important;
  font-weight: bold;
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

const MobileHeading = styled(Header)`
  width: 90%;
  color: #000;
  font-size: 1rem;
  opacity: 1;
`;

const MobileInfo = styled.div`
  width: 90%;
  color: #000;
  font-size: 0.9rem;
  opacity: 1;
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

const CardClinical = () => (
  <Card>
    <Image src={chartsImg} wrapped ui={false} />
    <Card.Content>
      <Card.Header>Clinical</Card.Header>
      <Card.Meta>
        <span className="date">Clinical Trials</span>
      </Card.Meta>
      <Card.Description>
        Streamlined and Simplified Registration
      </Card.Description>
    </Card.Content>
  </Card>
);

const CardCRO = () => (
  <Card>
    <Image src={chartsImg} wrapped ui={false} />
    <Card.Content>
      <Card.Header>CRO</Card.Header>
      <Card.Meta>
        <span className="date">Competative Marketplace</span>
      </Card.Meta>
      <Card.Description>Connect with CRO</Card.Description>
    </Card.Content>
  </Card>
);

const Homepage = props => {
  // const [isOpen, toggle] = useState(false);
  // const { isAuthenticated, themes } = useContext(AppContext);
  // const theme = useTheme();

  return (
    <React.Fragment>
      <Responsive minWidth={768} as={Grid.Row}>
        <Grid centered>
          <Grid.Row>
            <Grid.Column textAlign="center" verticalAlign="top">
              <HomeBgImage background={chemImg} />
              <Heading>Let Us Connect You To A Brighter Future.</Heading>
              <HomeInfo text>
                We strive to connect the biopharma industry to clinical and
                commercial service providers, with the goal of making
                outsourcing easier through an easy to use competitive bidding
                space, provide a central place of opportunities for service
                providers to bid on, and ultimately to bring the cost of
                clinical and commercial development down in order to lower drug
                development costs and bring down the cost of new treatments.
              </HomeInfo>
            </Grid.Column>
          </Grid.Row>
          <CardRow columns={2}>
            <Grid.Column width={4}>
              <CardClinical />
            </Grid.Column>
            <Grid.Column width={4}>
              <CardCRO />
            </Grid.Column>
          </CardRow>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <TextContainer>
                No more searching for the right service provider, have them come
                to you.
              </TextContainer>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Responsive>
      <Responsive {...Responsive.onlyMobile} as={Grid.Row}>
        <Grid centered>
          <Grid.Row>
            <GridBody
              textAlign="center"
              verticalAlign="top"
              background={chemImg}
            >
              <MobileHeading>
                Let Us Connect You To A Brighter Future.
              </MobileHeading>
              <MobileInfo>
                We strive to connect the biopharma industry to clinical and
                commercial service providers, with the goal of making
                outsourcing easier through an easy to use competitive bidding
                space, provide a central place of opportunities for service
                providers to bid on, and ultimately to bring the cost of
                clinical and commercial development down in order to lower drug
                development costs and bring down the cost of new treatments.
              </MobileInfo>
            </GridBody>
          </Grid.Row>
        </Grid>
      </Responsive>
    </React.Fragment>
  );
};

export default Homepage;
