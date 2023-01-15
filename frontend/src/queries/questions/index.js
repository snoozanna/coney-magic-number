import gql from "graphql-tag";

const QUESTIONS_QUERY = gql`
  query Questions {
    questions {
      data {
        attributes {
          question
        }
      }
    }
  }
`;

export default QUESTIONS_QUERY;
