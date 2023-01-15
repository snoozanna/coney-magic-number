import { useMutation } from "@apollo/client";

// Unfinished - would like this to be a resuable Mutation component to create new data

const Mutation = ({ mutation, children }) => {
  const [createMutation, { data, loading, error }] = useMutation(mutation);

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  // console.log("data", data);

  createMutation({ variables: { data } });
  return children;
};

export default Mutation;
