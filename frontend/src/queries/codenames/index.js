import gql from "graphql-tag";

const CODENAMES_QUERY = gql`
  query Codenames {
    codenames {
      data {
        attributes {
          codename
          confirmed
          surveys {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export default CODENAMES_QUERY;
