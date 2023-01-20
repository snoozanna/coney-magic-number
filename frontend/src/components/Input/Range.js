// TODO NEEDS A FORWARD REF
const Range = (max, questionId, { register }) => {
  console.log("register", register);
  return (
    <>
      <p></p>
      <input
        type="range"
        placeholder="your answer"
        min="1"
        max={max}
        step="0.1"
        {...register(`responses.${questionId}`, {
          required: true,
        })}
      />
    </>
  );
};

export default Range;
