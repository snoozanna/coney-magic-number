import gql from "graphql-tag";

const RESPONSES_BY_EMAIL_QUERY = gql`
  query Responses($email: String!) {
    responses(filters: { email: { eq: $email } }) {
      data {
        id
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
          survey {
            data {
              id
              attributes {
                name
                publishedAt
              }
            }
          }
        }
      }
    }
  }
`;

export default RESPONSES_BY_EMAIL_QUERY;
