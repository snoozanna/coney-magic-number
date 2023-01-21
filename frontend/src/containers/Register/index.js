import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import RESPONSES_QUERY from "../../queries/responses";
// import UserResults from "../../components/UserResults";
// import AllResults from "../../components/AllResults";

import Footer from "../../components/Footer";

import "./Register.css";

const Register = () => {
  // Show all Results
  // Show all results from one email address
  const [emails, setEmails] = useState([]);
  const [emailToShow, setEmailToShow] = useState("");

  const { data, loading, error } = useQuery(RESPONSES_QUERY);
  // console.log("responses", data);
  useEffect(() => {
    if (data) {
      getEmails(data);
    }
  }, [data]);

  // Map over data and push emails to state, so they show as an option in a select
  const getEmails = (data) => {
    // const { responses } = data;

    let emailsToPush = [];
    const totalResponses = data.responses.data;
    totalResponses.map((response) => {
      const { email } = response.attributes;

      if (!emailsToPush.includes(email)) {
        emailsToPush.push(email);
        setEmails((emails) => [...emails, email]);
      }
    });
    // console.log("etp", emailsToPush);
    // setEmails((emails) => [...emails, emailsToPush]);
  };

  if (loading) return "Loading...";
  if (error) return `Loading error! ${error.message}`;
  return (
    <>
      <main>
        <h2>Register</h2>
        <p> Email addresses:</p>
        <ul>
          {/* //set value here */}
          {emails.map((email, inx) => {
            return <li key={inx}>{email}</li>;
          })}
        </ul>

        {/* <AllResults /> */}
      </main>
      <Footer />
    </>
  );
};

export default Register;
