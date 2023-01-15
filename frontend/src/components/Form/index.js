import { useState } from "react";

import { useForm } from "react-hook-form";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { useMutation } from "@apollo/client";
import Query from "../../components/Query";

import SURVEYS_QUERY from "../../queries/surveys/index.js";
import QUESTIONS_QUERY from "./../../queries/questions/index.js";
import RESPONSE_MUTATION from "../../mutations/responses";
import "./Form.css";

const Form = () => {
  const [
    createResponse,
    { data: responseData, loading: responseLoading, error: responseError },
  ] = useMutation(RESPONSE_MUTATION);
  const [submitted, setSubmitted] = useState(false);

  // let { slug } = useParams();
  let { slug } = "survey-1";
  const { loading, error, data } = useQuery(SURVEYS_QUERY, {
    variables: { slug },
  });

  // const { loading, error, data } = useQuery(QUESTIONS_QUERY);

  // console.log("datainq", data);

  // const { name, slug } = data.surveys.data[0].attributes;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // TODO add successful submission
    console.log("submitting", data);
    createResponse({
      variables: {
        email: data.email,
        surveyQuestion: data.surveyQuestion,
        surveyResponse: data.surveyResponse,
      },
    });
  };
  if (responseLoading) return "Submitting...";
  if (responseError) return `Submission error! ${responseError.message}`;
  return (
    <>
      <Query query={SURVEYS_QUERY}>
        {({ data: { surveys } }) => {
          const surveyId = surveys.data[0].id;
          const { name } = surveys.data[0].attributes;
          const questionsToAsk = surveys.data[0].attributes.questions.data;
          return (
            <>
              <div className="formWrapper">
                <h1>{name}</h1>
                <form onSubmit={handleSubmit(onSubmit)} key={surveyId}>
                  <input
                    defaultValue="test"
                    {...register("email", { required: true })}
                  />
                  <input
                    defaultValue="test"
                    {...register("surveyResponse", { required: true })}
                  />
                  <input
                    defaultValue="test"
                    {...register("surveyQuestion", { required: true })}
                  />
                  <input type="submit" />;
                </form>
              </div>
            </>
          );
        }}
      </Query>
    </>
  );
};

export default Form;

//  return (
//    <>
//      <div className="formWrapper">
//        <h1>{name}</h1>
//        <form onSubmit={handleSubmit(onSubmit)} key={surveyId}>
//          {questionsToAsk.map((question) => {
//            const questionToAsk = question.attributes.question;
//            const questionId = question.id;

//            return (
//              <div className="questionWrapper" key={questionId}>
//                <h2>{questionToAsk}</h2>

//                <input
//                  defaultValue="test"
//                  {...register(questionId, { required: true })}
//                />
//                {/* errors will return when field validation fails  */}
//                {errors.exampleRequired && <span>This field is required</span>}
//              </div>
//            );
//          })}

//          <input type="submit" />
//        </form>
//      </div>
//    </>
//  );
