import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import "./styles/generics.css";
import App from "./containers/App/App";
import reportWebVitals from "./reportWebVitals";
import client from "./utils/apolloClient";

const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
