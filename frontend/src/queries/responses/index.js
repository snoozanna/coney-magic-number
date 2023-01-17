import gql from "graphql-tag";

const RESPONSES_QUERY = gql`
  query Responses {
    responses(sort: "publishedAt:asc", pagination: { limit: 100 }) {
      data {
        attributes {
          email
          surveyQuestion
          surveyResponse
          question {
            data {
              attributes {
                questionText
              }
              id
            }
          }
        }
      }
    }
  }
`;

export default RESPONSES_QUERY;
