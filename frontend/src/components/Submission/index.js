import { useState, useEffect } from "react";
import "./Submission.css";

const Submission = ({ responses }) => {
  const submissionDates = [];
  const submissions = [];
  const { data } = responses;
  const [submissionsToShow, setSubmissionsToShow] = useState();

  useEffect(() => {
    data.map((response) => {
      // console.log("response", response);
      const submissionDate = response.attributes.publishedAt;
      // console.log("submissionDates", submissionDates);
      if (!submissionDates.includes(submissionDate)) {
        submissionDates.push(submissionDate);
        submissions.push([response]);
        // console.log(submissionDates);
      } else if (submissionDates.includes(submissionDate)) {
        submissions.map((submission) => {
          // console.log("submission", submission);
          if (submission[0].attributes.publishedAt === submissionDate)
            submission.push(response);
          return submissions;
        });
      }
      // console.log("submissions", submissions);
      return (
        <>
          <p>submissions</p>
          {submissions.map((submission) => {
            // console.log("submission", submission);
          })}
        </>
      );
    });
  }, [data]);

  useEffect(() => {
    console.log("submissions are:", submissions);
    setSubmissionsToShow(submissions);
  }, [data]);

  if (submissionsToShow) {
    return (
      <>
        <div className="submissionContainer">
          {submissionsToShow.map((submission, idx) => {
            const d = new Date(submission[0].attributes.publishedAt);

            return (
              <div className="submissionWrapper" key={idx}>
                <h2>Submission</h2>
                <p>
                  Completed:{" "}
                  {submission[0].attributes.survey.data.attributes.name}{" "}
                </p>
                <p> at {d.toString()}</p>
                {submission.map((response) => {
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
            );
          })}
        </div>
      </>
    );
  } else return <p>No submissions to show...</p>;
};

export default Submission;
