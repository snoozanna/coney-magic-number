import { useState } from "react";
// import Range from "./Range.js";

const Input = ({ question, register, watch }) => {
  const [num, setNum] = useState();
  const questionText = question.attributes.questionText;
  const questionId = question.id;
  const questionType = question.attributes.options[0].__typename;

  // TODO  show the slider number

  return (
    <div className="questionWrapper survey" key={questionId}>
      <label htmlFor={`responses.${questionId}`}>{questionText}</label>

      {questionType === "ComponentOptionsText" ? (
        <input
          placeholder="your answer"
          {...register(`responses.${questionId}`, {
            required: true,
          })}
        />
      ) : questionType === "ComponentOptionsMultiplechoice" ? (
        <select
          {...register(`responses.${questionId}`, {
            required: true,
          })}
        >
          <option value={question.attributes.options[0].a}>
            {question.attributes.options[0].a}
          </option>
          <option value={question.attributes.options[0].b}>
            {question.attributes.options[0].b}
          </option>
          <option value={question.attributes.options[0].c}>
            {question.attributes.options[0].c}
          </option>
        </select>
      ) : questionType === "ComponentOptionsSlider" ? (
        // TODO may need to add a stateful component of Range so that dynamic range can be watched
        <>
          <p></p>
          <input
            type="range"
            placeholder="your answer"
            min="1"
            max={question.attributes.options[0].max}
            step="0.1"
            {...register(`responses.${questionId}`, {
              required: true,
            })}
          />
        </>
      ) : (
        <input
          placeholder="your answer"
          {...register(`responses.${questionId}`, {
            required: true,
          })}
        />
      )}
    </div>
  );
};

export default Input;
