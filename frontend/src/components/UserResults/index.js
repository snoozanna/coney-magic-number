import { useState } from "react";
import { useQuery } from "@apollo/client";
import Query from "../../components/Query";
import RESPONSES_BY_EMAIL_QUERY from "../../queries/responseByEmail";
import "./UserResults.css";

const UserResults = ({ email }) => {
  return (
    <>
      <Query query={RESPONSES_BY_EMAIL_QUERY} variables={{ email }}>
        {({ data: { responses } }) => {
          const responsesToShow = responses.data;
          console.log("responses", responses);
          return (
            <>
              <div className="surveyResponseWrapper">
                <h2>{email}</h2>
                <p>
                  Completed:{" "}
                  {responses.data[0].attributes.survey.data.attributes.name}{" "}
                </p>
                <p>
                  {" "}
                  at{" "}
                  {
                    responses.data[0].attributes.survey.data.attributes
                      .publishedAt
                  }
                </p>
                {responsesToShow.map((response) => {
                  const { id } = response;
                  const { surveyResponse } = response.attributes;
                  const questionText =
                    response.attributes.question.data.attributes.questionText;

                  return (
                    <div className="questionResponseWrapper" key={id}>
                      <p className="question">{questionText}</p>
                      <p className="response">{surveyResponse}</p>
                    </div>
                  );
                })}
              </div>
            </>
          );
        }}
      </Query>
    </>
  );
};

export default UserResults;
