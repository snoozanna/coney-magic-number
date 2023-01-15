import { gql } from "@apollo/client";
import RESPONSE_MUTATION from "./../../mutations/responses";
import { useMutation } from "@apollo/client";

import { useEffect, useState } from "react";

const Mutation1 = (props) => {
  const [createResponse, { data, loading, error }] =
    useMutation(RESPONSE_MUTATION);
  const [email, setEmail] = useState("");
  const [surveyQuestion, setSurveyQuestion] = useState("");
  const [surveyResponse, setSurveyResponse] = useState("");

  useEffect(() => {});
  return (
    <div>
      {props.children}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createResponse({
            variables: {
              email: email,
              surveyQuestion: surveyQuestion,
              surveyResponse: surveyResponse,
            },
          });
        }}
      >
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="surveyQuestion">surveyQuestion</label>
        <input
          id="surveyQuestion"
          type="text"
          value={surveyQuestion}
          onChange={(e) => {
            setSurveyQuestion(e.target.value);
          }}
        />
        <label htmlFor="surveyResponse">surveyResponse</label>
        <input
          id="surveyResponse"
          type="text"
          value={surveyResponse}
          onChange={(e) => {
            setSurveyResponse(e.target.value);
          }}
        />
        <button>Create Response</button>
      </form>
    </div>
  );
};

export default Mutation1;
