import { graphql } from "react-apollo";
import { isServiceAvailable } from "./info.query";

export const withServiceInfo = graphql(isServiceAvailable, {
  props: ({ data: { serviceAvailable, loading }, ownProps }) => {
    return {
      ...ownProps,
      serviceAvailable:
        serviceAvailable && serviceAvailable.status
          ? serviceAvailable.status
          : false,
      serviceLoading: loading
    };
  }
});
