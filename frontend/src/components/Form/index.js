import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { useMutation } from "@apollo/client";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Footer from "../Footer";

import Query from "../../components/Query";
import SURVEYS_QUERY from "../../queries/surveys/index.js";
import QUESTIONS_QUERY from "./../../queries/questions/index.js";
import RESPONSE_MUTATION from "../../mutations/responses";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Form.css";

const Form = () => {
  const [submitted, setSubmitted] = useState(false);

  // GQL mutation to create new data
  const [
    createResponse,
    { data: responseData, loading: responseLoading, error: responseError },
  ] = useMutation(RESPONSE_MUTATION);

  // let { slug } = useParams();
  let { slug } = "survey-1";
  // const { loading, error, data } = useQuery(SURVEYS_QUERY, {
  //   variables: { slug },
  // });

  // const { loading, error, data } = useQuery(QUESTIONS_QUERY);

  // console.log("datainq", data);

  // const { name, slug } = data.surveys.data[0].attributes;

  // Form - React Hook Forms functionality
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      responses: {},
    },
  });

  const onSubmit = (data) => {
    // TODO add successful submission

    const datePublishedAt = new Date();
    // loop over the responses to the questions
    for (const response in data.responses) {
      console.log(data.survey);
      console.log(data.email, response, data.responses[response]);
      // submit a response for each individual one
      createResponse({
        variables: {
          email: data.email,
          question: response,
          surveyQuestion: response,
          surveyResponse: data.responses[response],
          survey: data.survey,
          publishedAt: datePublishedAt,
        },
      });
    }

    setSubmitted(true);
  };
  if (responseLoading) return "Submitting...";
  if (responseError) return `Submission error! ${responseError.message}`;

  return (
    <>
      <main>
        <Query query={SURVEYS_QUERY}>
          {({ data: { surveys } }) => {
            const surveyId = surveys.data[0].id;
            const { name } = surveys.data[0].attributes;
            const questionsToAsk = surveys.data[0].attributes.questions.data;

            return (
              <>
                <div className="formContainer">
                  <div className="formWrapper">
                    <div className="formStatus">
                      <span>
                        {submitted ? "Submitted" : "Not yet submitted"}
                      </span>
                    </div>
                    <h1>{name}</h1>
                    <form onSubmit={handleSubmit(onSubmit)} key={surveyId}>
                      <div className="questionContainer">
                        <div className="questionWrapper">
                          <label htmlFor="email">Email:</label>
                          <input
                            defaultValue="email address"
                            placeholder="your email"
                            {...register("email", { required: true })}
                          />
                          {errors.email && <span>This field is required</span>}
                          <input
                            hidden
                            defaultValue={surveyId}
                            {...register("survey", { required: true })}
                          />
                        </div>

                        {questionsToAsk.map((question) => {
                          //  TODO - Add multiple choice and slider functionality
                          const questionText = question.attributes.questionText;
                          const questionId = question.id;

                          return (
                            <div
                              className="questionWrapper survey"
                              key={questionId}
                            >
                              <label htmlFor={`responses.${questionId}`}>
                                {questionText}
                              </label>
                              <input
                                placeholder="your answer"
                                {...register(`responses.${questionId}`, {
                                  required: true,
                                })}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <button type="submit" disabled={submitted}>
                        {submitted ? "Sumbitted" : "Submit!"}
                      </button>
                    </form>
                  </div>
                </div>
              </>
            );
          }}
        </Query>
      </main>

      <Footer />
    </>
  );
};

export default Form;

//  return (
//    <>
//      <div className="formWrapper">
//        <h1>{name}</h1>

//      </div>
//    </>
//  );

//  <form onSubmit={handleSubmit(onSubmit)} key={surveyId}>
//    <input defaultValue="test" {...register("email", { required: true })} />
//    <input
//      defaultValue="test"
//      {...register("surveyResponse", { required: true })}
//    />
//    <input
//      defaultValue="test"
//      {...register("surveyQuestion", { required: true })}
//    />
//    <input type="submit" />;
//  </form>;
