import gql from "graphql-tag";

const RESPONSE_MUTATION = gql`
  mutation createResponse(
    $email: String!
    $surveyQuestion: String!
    $surveyResponse: String!
  ) {
    createResponse(
      data: {
        email: $email
        surveyQuestion: $surveyQuestion
        surveyResponse: $surveyResponse
      }
    ) {
      data {
        id
        attributes {
          email
          surveyQuestion
          surveyResponse
        }
      }
    }
  }
`;

export default RESPONSE_MUTATION;
