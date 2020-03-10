import React, { useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { withAppTheme } from "../../../provider/ThemeProvider";
import { AppContext } from "../../../provider/AppContextProvider";
import { withRouter } from "react-router-dom";
import {
  Grid,
  Image,
  Icon,
  Menu,
  Input,
  Button,
  Responsive,
  Dropdown
} from "semantic-ui-react";
import biobidimg from "../../../static/biobidportal-whiteonblue-title.png";
import wireframeAvatar from "../../../static/square-image.png";

const DropdownWrapper = styled.div`
  .link.item {
    background-color: #002657;
    color: #fff;

    border: none !important;
    outline: none !important;
    box-shadow: none !important;

    :active,
    :focus,
    :visited,
    :hover {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
      background-color: #002657;
    }
  }
`;

const StyledImage = styled(Image)`
  height: 70px;
  padding: 10px 10px 10px 40px;
`;

const StyledImageMobile = styled(Image)`
  height: 50px;
  padding: 10px 10px 10px 40px;
`;

const StyledSiteHeader = styled(Grid.Row)`
  background-color: #002657;
`;

const MenuCol = styled(Grid.Column)`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
`;

const Avatar = props => (
  <React.Fragment>
    <Image src={wireframeAvatar} avatar />
    <span>Hi {props.firstName || props.isAuthenticated}</span>
  </React.Fragment>
);

const trigger = <Icon name="bars" />;

const MenuComponentMobile = props => {
  const { isAuthenticated } = useContext(AppContext);

  return (
    <DropdownWrapper>
      <Menu>
        <Dropdown
          className="link item"
          trigger={trigger}
          pointing="top left"
          icon={null}
        >
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => props.history.push("/")}>
              Home
            </Dropdown.Item>
            <Dropdown.Item onClick={() => props.history.push("/about")}>
              About
            </Dropdown.Item>
            <Dropdown.Item onClick={() => props.history.push("/contact")}>
              Contact
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => {
                if (isAuthenticated) {
                  return props.onAuth(false);
                }
                props.onAuth(true);
              }}
            >
              {isAuthenticated ? "Log Out" : "Log In"}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    </DropdownWrapper>
  );
};

const MenuComponentDesktop = props => {
  const { isAuthenticated } = useContext(AppContext);

  return (
    <Menu secondary inverted>
      <Menu.Item
        name="home"
        value="home"
        active={props.activeItem === "home"}
        onClick={props.handleItemClick}
      />
      <Menu.Item
        name="about"
        value="about"
        active={props.activeItem === "about"}
        onClick={props.handleItemClick}
      />
      <Menu.Item
        name="contact"
        value="contact"
        active={props.activeItem === "contact"}
        onClick={props.handleItemClick}
      />
      <Menu.Menu position="right">
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
        <MenuItemUserAuth {...props} isAuthenticated={isAuthenticated} />
      </Menu.Menu>
    </Menu>
  );
};

const MenuItemUserAuth = props => {
  return (
    <React.Fragment>
      {props.isAuthenticated ? (
        <Menu.Item onClick={() => props.onAuth(false)}>
          <Avatar {...props} />
        </Menu.Item>
      ) : (
        <React.Fragment>
          <Menu.Item
            name="log in"
            icon="lock"
            onClick={() => props.onAuth(true)}
          />
          <Menu.Item>
            <Button primary>Sign Up</Button>
          </Menu.Item>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const HeaderComponent = props => {
  const { location, history, ...other } = props;
  const { originalUrl } = history;
  const { pathname } = location;
  history.path = originalUrl;

  /* global state */
  const { isAuthenticated, onAuthenticate } = useContext(AppContext);

  const initMenu = "home";

  /* local state */
  const [activeItem, onClickMenu] = useState(initMenu);

  useEffect(() => {
    onClickMenu(initMenu);
  }, [isAuthenticated]);

  const onAuth = val => {
    if (val) {
      history.push("/login");
    } else {
      history.push("/");
      onClickMenu("home");
      onAuthenticate(val || false);
      document.cookie =
        "authentication= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    }
  };

  const handleItemClick = (e, { name, value }) => {
    onClickMenu(value);
    history.push("/" + (value === "home" ? "" : value));
  };

  const forwardProps = {
    history,
    handleItemClick,
    onAuth,
    activeItem,
    onClickMenu,
    isAuthenticated,
    onAuthenticate,
    ...other
  };

  return (
    <React.Fragment>
      <Responsive minWidth={768} as={StyledSiteHeader}>
        <Grid.Column floated="left" width={3}>
          <StyledImage src={biobidimg} />
        </Grid.Column>
        <MenuCol>
          <MenuComponentDesktop {...forwardProps} />
        </MenuCol>
      </Responsive>
      <Responsive {...Responsive.onlyMobile} as={StyledSiteHeader}>
        <MenuCol>
          <MenuComponentMobile {...forwardProps} />
        </MenuCol>
        <Grid.Column>
          <StyledImageMobile src={biobidimg} />
        </Grid.Column>
      </Responsive>
    </React.Fragment>
  );
};

export default withRouter(withAppTheme(HeaderComponent));
