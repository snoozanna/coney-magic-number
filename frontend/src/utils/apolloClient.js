import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

//TODO Implement .env
// require("dotenv").config();
// console.log("pe,", process.env);
// import { ApolloClient } from "apollo-client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { HttpLink } from "apollo-link-http";

const cache = new InMemoryCache();
const link = new HttpLink({
  // uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
  uri: `http://localhost:1337/graphql`,
  // uri: `https://strapi-v1ph.onrender.com/graphql`,
});
const client = new ApolloClient({
  cache,
  link,
});

export default client;
