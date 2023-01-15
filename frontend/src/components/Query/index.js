import React from "react";
import { useQuery } from "@apollo/client";

const Query = ({ children, query, slug }) => {
  const { data, loading, error } = useQuery(query, {
    variables: { slug: slug },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  // console.log("data", data);
  return children({ data });
};

export default Query;