import gql from "graphql-tag";

const RESPONSE_MUTATION = gql`
  mutation createResponse(
    $email: String!
    $question: ID!
    $surveyQuestion: String!
    $surveyResponse: String!
    $survey: ID!
    $publishedAt: DateTime!
  ) {
    createResponse(
      data: {
        email: $email
        question: $question
        surveyQuestion: $surveyQuestion
        surveyResponse: $surveyResponse
        survey: $survey
        publishedAt: $publishedAt
      }
    ) {
      data {
        id
        attributes {
          email
          question {
            data {
              id
            }
          }
          survey {
            data {
              id
            }
          }
          surveyQuestion
          surveyResponse
          publishedAt
        }
      }
    }
  }
`;

export default RESPONSE_MUTATION;
