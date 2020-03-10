import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { withRouter } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";
import { AppContext } from "../../provider/AppContextProvider";
import { HomepageHeading } from "../Public/HomepageLayout";
import biobidimg from "../../static/biobidportal-whiteonblue-title.png";
import biobidimgmobile from "../../static/biobidportal-whiteonblue-icon.png";
import biobidimginverse from "../../static/biobidportal-blueonwhite-title-inverse.png";
import avatarElliot from "../../static/avatar-elliot.jpg";
import pack from "../../../package.json";

const HeaderStyle = styled(Segment)`
  min-height: ${props => (props.lrg ? "500px" : "80px")};
  padding: 1em 0em;
  background: #002657 !important;
`;

const SidebarWrapper = styled(Sidebar)`
  background: #002657 !important;
`;

const SidebarPusherWrapper = styled(Sidebar.Pusher)`
  min-height: ${props => (props.lrg ? "80px" : "20px")};
`;

const StyledImage = styled(Image)`
  height: ${props => (props.mbl ? "30px" : "70px")};
  padding: ${props => (props.mbl ? "0px 5px 0px 20px" : "10px 10px 10px 40px")};
`;

const HeaderContainer = styled(Container)`
  margin: 0 !important;
  width: 100% !important;
`;

const HeaderImage = styled(Menu.Item)`
  padding: 0 !important;
`;

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const Avatar = props => (
  <React.Fragment>
    <Image
      src={avatarElliot}
      avatar
      onClick={() => {
        if (props.isAuthenticated) {
          return props.onAuth(false);
        }
        props.onAuth(true);
      }}
    />
    <span>Hi {props.firstName || props.isAuthenticated}</span>
  </React.Fragment>
);

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
const DesktopContainer = props => {
  const {
    handleItemClick,
    onAuth,
    activeMenu,
    isAuthenticated,
    children
  } = props;

  /* local state */
  const [fixed, onFixedMenu] = useState(false);

  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
      <Visibility
        once={false}
        onBottomPassed={() => onFixedMenu(true)}
        onBottomPassedReverse={() => onFixedMenu(false)}
      >
        <HeaderStyle
          inverted
          textAlign="center"
          vertical
          lrg={activeMenu.includes("home") ? "home" : ""}
        >
          <Menu
            fixed={fixed ? "top" : null}
            inverted={!fixed}
            pointing={!fixed}
            secondary={!fixed}
            size="large"
          >
            <HeaderContainer>
              <HeaderImage position="left">
                <StyledImage src={fixed ? biobidimginverse : biobidimg} />
              </HeaderImage>
              <Menu.Item
                as="a"
                value="home"
                active={activeMenu.includes("home")}
                onClick={handleItemClick}
              >
                Home
              </Menu.Item>
              <Menu.Item
                as="a"
                value="about"
                active={activeMenu.includes("about")}
                onClick={handleItemClick}
              >
                About
              </Menu.Item>
              <Menu.Item
                as="a"
                value="contact"
                active={activeMenu.includes("contact")}
                onClick={handleItemClick}
              >
                Contact
              </Menu.Item>
              <Menu.Item position="right">
                {isAuthenticated ? (
                  <Avatar {...props} />
                ) : (
                  <React.Fragment>
                    <Button
                      as="a"
                      inverted={!fixed}
                      value="login"
                      onClick={() => {
                        if (isAuthenticated) {
                          return onAuth(false);
                        }
                        onAuth(true);
                      }}
                    >
                      {isAuthenticated ? "Log Out" : "Log In"}
                    </Button>
                    <Button
                      as="a"
                      inverted={!fixed}
                      primary={fixed}
                      style={{ marginLeft: "0.5em" }}
                    >
                      Sign Up
                    </Button>
                  </React.Fragment>
                )}
              </Menu.Item>
            </HeaderContainer>
          </Menu>
          {activeMenu.includes("home") ? <HomepageHeading /> : null}
        </HeaderStyle>
      </Visibility>
      {children}
    </Responsive>
  );
};

DesktopContainer.propTypes = {
  children: PropTypes.node
};

const MobileContainer = props => {
  const {
    handleItemClick,
    onAuth,
    activeMenu,
    isAuthenticated,
    children,
    sidebarOpened,
    onSidebarOpened
  } = props;

  return (
    <Responsive
      as={Sidebar.Pushable}
      getWidth={getWidth}
      maxWidth={Responsive.onlyMobile.maxWidth}
    >
      <SidebarWrapper
        as={Menu}
        animation="push"
        inverted
        onHide={() => onSidebarOpened(false)}
        vertical
        visible={sidebarOpened}
      >
        <Menu.Item
          as="a"
          value="home"
          active={activeMenu.includes("home")}
          onClick={handleItemClick}
        >
          Home
        </Menu.Item>
        <Menu.Item
          as="a"
          value="about"
          active={activeMenu.includes("about")}
          onClick={handleItemClick}
        >
          About
        </Menu.Item>
        <Menu.Item
          as="a"
          value="contact"
          active={activeMenu.includes("contact")}
          onClick={handleItemClick}
        >
          Contact
        </Menu.Item>
        <Menu.Item
          as="a"
          value="login"
          onClick={() => {
            if (isAuthenticated) {
              return onAuth(false);
            }
            onAuth(true);
          }}
        >
          Log in
        </Menu.Item>
        <Menu.Item as="a">Sign Up</Menu.Item>
      </SidebarWrapper>

      <SidebarPusherWrapper
        dimmed={sidebarOpened}
        lrg={activeMenu.includes("home") ? "home" : ""}
      >
        <HeaderStyle inverted textAlign="center" vertical>
          <Container>
            <Menu inverted pointing secondary size="large">
              <Menu.Item onClick={() => onSidebarOpened(true)}>
                <Icon name="sidebar" />
              </Menu.Item>
              <Menu.Item position="right">
                <StyledImage mbl={"true"} src={biobidimgmobile} />
              </Menu.Item>
            </Menu>
          </Container>
          {activeMenu.includes("home") ? <HomepageHeading mobile /> : null}
        </HeaderStyle>
        {children}
      </SidebarPusherWrapper>
    </Responsive>
  );
};

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children, history }) => {
  const page =
    history.location.pathname === "/" ? "home" : history.location.pathname;

  const { isAuthenticated, onAuthenticate } = useContext(AppContext);

  /* local state */
  const [activeMenu, onActiveMenu] = useState(() => {
    return page;
  });
  const [sidebarOpened, onSidebarOpened] = useState(false);

  useEffect(() => {
    onActiveMenu(page);
  }, [page]);

  const onAuth = val => {
    onSidebarOpened(false);
    if (val) {
      onActiveMenu("login");
      history.push("/login");
    } else {
      history.push("/");
      onActiveMenu("home");
      onAuthenticate(false);
      document.cookie =
        "authentication= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    }
  };

  const handleItemClick = (e, { value }) => {
    onActiveMenu(value);
    onSidebarOpened(false);
    history.push("/" + (value === "home" ? "" : value));
  };

  const forwardProps = {
    history,
    handleItemClick,
    onAuth,
    activeMenu,
    onActiveMenu,
    isAuthenticated,
    onAuthenticate,
    sidebarOpened,
    onSidebarOpened
  };

  return (
    <React.Fragment>
      <DesktopContainer {...forwardProps}>{children}</DesktopContainer>
      <MobileContainer {...forwardProps}>{children}</MobileContainer>
    </React.Fragment>
  );
};

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const Copywrite = styled(List.Item)`
  font-size: 0.8rem;
`;

const Footer = ({ history }) => {
  return (
    <Segment
      inverted
      vertical
      style={{ padding: "5em 0em", backgroundColor: "#002657" }}
    >
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a" onClick={() => history.push("/about")}>
                  About
                </List.Item>
                <List.Item as="a" onClick={() => history.push("/contact")}>
                  Contact Us
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a">Sponsor</List.Item>
                <List.Item as="a">Provider</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Copywrite>© Copyright 2020&nbsp; BB Portal, LLC</Copywrite>
              <Copywrite>
                <p>v.{pack.version}</p>
              </Copywrite>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};

const Layout = ({ children, history }) => {
  return (
    <ResponsiveContainer history={history}>
      {children}
      <Footer history={history} />
    </ResponsiveContainer>
  );
};

export default withRouter(Layout);

// const Layout = ({ children }) => {
//   return (
//     <Grid centered padded>
//       <HeaderRowContainer>
//         <Grid.Column>
//           <LayoutHeader />
//         </Grid.Column>
//       </HeaderRowContainer>
//       <Grid.Row>
//         <Grid.Column>{children}</Grid.Column>
//       </Grid.Row>
//       <Grid.Row>
//         <Grid.Column>
//           <LayoutFooter />
//         </Grid.Column>
//       </Grid.Row>
//     </Grid>
//   );
// };

// class MobileContainer1 extends Component {
//   state = {};

//   handleSidebarHide = () => this.setState({ sidebarOpened: false });

//   handleToggle = () => this.setState({ sidebarOpened: true });

//   render() {
//     const { children } = this.props;
//     const { sidebarOpened } = this.state;

//     return (
//       <Responsive
//         as={Sidebar.Pushable}
//         getWidth={getWidth}
//         maxWidth={Responsive.onlyMobile.maxWidth}
//       >
//         <Sidebar
//           as={Menu}
//           animation="push"
//           inverted
//           onHide={this.handleSidebarHide}
//           vertical
//           visible={sidebarOpened}
//         >
//           <Menu.Item as="a" active>
//             Home
//           </Menu.Item>
//           <Menu.Item as="a">Work</Menu.Item>
//           <Menu.Item as="a">Company</Menu.Item>
//           <Menu.Item as="a">Careers</Menu.Item>
//           <Menu.Item as="a">Log in</Menu.Item>
//           <Menu.Item as="a">Sign Up</Menu.Item>
//         </Sidebar>

//         <Sidebar.Pusher dimmed={sidebarOpened}>
//           <Segment
//             inverted
//             textAlign="center"
//             style={{ minHeight: 350, padding: "1em 0em" }}
//             vertical
//           >
//             <Container>
//               <Menu inverted pointing secondary size="large">
//                 <Menu.Item onClick={this.handleToggle}>
//                   <Icon name="sidebar" />
//                 </Menu.Item>
//                 <Menu.Item position="right">
//                   <Button as="a" inverted>
//                     Log in
//                   </Button>
//                   <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
//                     Sign Up
//                   </Button>
//                 </Menu.Item>
//               </Menu>
//             </Container>
//             <HomepageHeading mobile />
//           </Segment>

//           {children}
//         </Sidebar.Pusher>
//       </Responsive>
//     );
//   }
// }
