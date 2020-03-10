import gql from 'graphql-tag';

export const isServiceAvailable = gql`
  query serviceAvailable {
    serviceAvailable {
      status
    }
  }
`;
