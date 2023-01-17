import { useState } from "react";

import Query from "../../components/Query";
import RESPONSES_QUERY from "../../queries/responses";
import "./UserResults.css";

const AllResults = () => {
  return (
    <>
      <h1>Responses</h1>
      <Query query={RESPONSES_QUERY}>
        {({ data: { responses } }) => {
          const responsesToShow = responses.data;
          console.log("responses", responses);
          return (
            <>
              {responsesToShow.map((response) => {
                const { email, surveyResponse } = response.attributes;
                const questionText =
                  response.attributes.question.data.attributes.questionText;
                console.log(email, surveyResponse);
                return (
                  <>
                    <div className="responseWrapper">
                      <p>Email: {email}</p>
                      <p>Question: {questionText}</p>
                      <p>Response: {surveyResponse}</p>
                    </div>
                  </>
                );
              })}
            </>
          );
        }}
      </Query>
    </>
  );
};

export default AllResults;
