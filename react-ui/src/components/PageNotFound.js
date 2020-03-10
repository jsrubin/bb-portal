import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Icon, Segment, Header } from "semantic-ui-react";

const PageNotFound = props => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="warning sign" color="orange" />
        Sorry, that page doesn't exist.
      </Header>
      <Segment.Inline>
        <Button primary onClick={() => props.history.push("/")}>
          Home
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default withRouter(PageNotFound);
