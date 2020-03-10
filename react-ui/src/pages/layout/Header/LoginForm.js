import React from "react";
import styled from "@emotion/styled";
import { compose, withState } from "recompose";
import { Formik } from "formik";
import { withAppTheme } from "../../../provider/ThemeProvider";
import { withAppContext } from "../../../provider/AppContextProvider";
import { withRouter } from "react-router-dom";

export const FormBody = styled.div`
  text-align: center;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  width: 300px;
  height: 35px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

export const Button = styled.button`
  width: 300px;
  height: 35px;
  background-color: #5995ef;
  color: #fff;
  border-radius: 3px;
`;

export const Text = styled.p`
  font-family: "Raleway", sans-serif;
  color: ${props => props.color || "#4d4d4d"};
`;

export const Label = styled.label`
  display: grid;
  text-transform: uppercase;
`;

const LoginForm = ({
  history,
  setUsername,
  redirectPath = "",
  context: { onAuthenticate, toggle }
}) => (
  <FormBody>
    {/* FORMIK */}
    <Formik
      initialValues={{ username: "unauthorized", password: "123456" }}
      validate={values => {
        let errors = {};
        // REGEX
        let regex = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        // VALIDATION
        if (!values.username) {
          errors.username = "username is required";
        } else if (regex.test(values.username)) {
          errors.username = "Invalid username";
        }

        if (!values.password) {
          errors.password = "A password is required";
        } else if (values.password.length < 6) {
          errors.password = "Password must be 6 characters";
        }
        return errors;
      }}
      onSubmit={values => {
        onAuthenticate(true);
        toggle(false);
        setUsername(values.username);
        history.push(redirectPath || "/");
      }}
      render={({
        touched,
        errors,
        values,
        handleChange,
        handleBlur,
        handleSubmit
      }) => (
        <Form onSubmit={handleSubmit}>
          <Label>
            Username or Email Address
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              border={touched.username && errors.username && "1px solid red"}
              type="text"
              name="username"
              placeholder="username"
            />
            {touched.username && errors.username && (
              <Text color="red">{errors.username}</Text>
            )}
          </Label>
          <Label>
            Password
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              border={touched.password && errors.password && "1px solid red"}
              type="password"
              name="password"
              placeholder="Password"
            />
            {touched.password && errors.password && (
              <Text color="red">{errors.password}</Text>
            )}
          </Label>
          <Button type="submit">Log In</Button>
        </Form>
      )}
    />
    {/* END OF FORMIK */}
  </FormBody>
);

export default compose(
  withState("username", "setUsername", ""),
  withAppContext,
  withRouter,
  withAppTheme
)(LoginForm);
