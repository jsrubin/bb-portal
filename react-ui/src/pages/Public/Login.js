/* react */
import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import { withRouter } from "react-router-dom";
/* semantic-ui */
import {
  Segment,
  Grid,
  Form,
  Divider,
  Button,
  Icon,
  Message,
  Responsive
} from "semantic-ui-react";
/* bbp */
import { AppContext } from "provider/AppContextProvider";

const LoginRow = styled(Grid.Row)`
  padding-top: 0px !important;
`;

const _onSubmit = props => {
  const { onAuthenticate, history } = props;

  return async () => {
    onAuthenticate(true);
    history.push("/");
  };
};

const _onChange = ({
  email,
  setEmail,
  password,
  setPassword,
  onSubmitEnabled
}) => {
  return type => {
    if (email.length > 0 && password.length > 0) {
      onSubmitEnabled(true);
    } else {
      onSubmitEnabled(false);
    }
    if (type.hasOwnProperty("email")) {
      setEmail(type.email);
    }
    if (type.hasOwnProperty("password")) {
      setPassword(type.password);
    }
  };
};

const LoginForm = withRouter(ownProps => {
  const { onAuthenticate } = useContext(AppContext);

  /* local state */
  const [submitEnabled, onSubmitEnabled] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const [email, setEmail] = useState("test");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [password, setPassword] = useState("test");
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  // combined own props with local and global state
  const props = {
    ...ownProps,
    email,
    setEmail,
    emailInvalid,
    setEmailInvalid,
    password,
    setPassword,
    passwordInvalid,
    setPasswordInvalid,
    submitEnabled,
    onSubmitEnabled,
    validationMessage,
    setValidationMessage,
    onAuthenticate
  };

  const onSubmit = props._onSubmit({ ...props, onAuthenticate });
  const onChange = props._onChange(props);

  return (
    <React.Fragment>
      <Form
        error={validationMessage ? true : false}
        onSubmit={() => onSubmit({ email: "", password: "" })}
      >
        <Message error content={validationMessage} />
        <Form.Input
          fluid
          label="Email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e, { email, value }) => onChange({ email: value })}
          error={emailInvalid ? true : false}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          value={password}
          type="password"
          onChange={(e, { password, value }) => onChange({ password: value })}
          error={passwordInvalid ? true : false}
        />
        <Form.Group widths="equal">
          <Form.Button
            icon="question circle"
            content="Forgot Password?"
            fluid
            basic
          />

          <Form.Button
            content="Login"
            primary
            fluid
            disabled={!submitEnabled}
          />
        </Form.Group>
      </Form>
    </React.Fragment>
  );
});

LoginForm.defaultProps = {
  _onSubmit,
  _onChange
};

const Padding = styled.div`
  padding-top: 20px;
`;

const MobileLogin = props => {
  return (
    <React.Fragment>
      <Padding />
      <LoginForm {...props} />
    </React.Fragment>
  );
};

const LoginPage = props => {
  return (
    <React.Fragment>
      <Grid padded centered>
        <Responsive minWidth={Responsive.onlyTablet.minWidth} as={Grid.Row}>
          <Grid.Column width={5}>
            <Segment.Group raised>
              <Grid padded centered>
                <Grid.Row>
                  <Grid.Column>
                    <Button icon labelPosition="left" primary fluid>
                      <Icon name="lock" />
                      Single Sign-On
                    </Button>
                  </Grid.Column>
                </Grid.Row>
                <LoginRow>
                  <Grid.Column>
                    <Divider />
                  </Grid.Column>
                </LoginRow>
                <LoginRow>
                  <Grid.Column>
                    <LoginForm {...props} />
                  </Grid.Column>
                </LoginRow>
              </Grid>
            </Segment.Group>
          </Grid.Column>
        </Responsive>
      </Grid>
      <Responsive {...Responsive.onlyMobile} as={Grid.Row}>
        <Grid centered>
          <Grid.Column width={5}>
            <LoginRow>
              <Grid.Column>
                <MobileLogin {...props} />
              </Grid.Column>
            </LoginRow>
          </Grid.Column>
        </Grid>
      </Responsive>
    </React.Fragment>
  );
};

export default LoginPage;
