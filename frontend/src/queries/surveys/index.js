import gql from "graphql-tag";

const SURVEYS_QUERY = gql`
  # query Survey($slug: String!) {
  query Surveys {
    # surveys(filters: { slug: { eq: $slug } }) {
    surveys {
      data {
        id
        attributes {
          name
          slug
          questions {
            data {
              id
              attributes {
                questionText
                options {
                  __typename
                  ... on ComponentOptionsMultiplechoice {
                    a
                    b
                    c
                  }
                  ... on ComponentOptionsText {
                    length
                  }
                  ... on ComponentOptionsSlider {
                    max
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default SURVEYS_QUERY;
