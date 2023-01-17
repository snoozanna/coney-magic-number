import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Query from "../../components/Query";
import RESPONSES_QUERY from "../../queries/responses";
import UserResults from "../../components/UserResults";
import AllResults from "../../components/AllResults";
import Footer from "../../components/Footer";

import "./Results.css";

const Results = () => {
  // Show all Results
  // Show all results from one email address
  const [emails, setEmails] = useState([]);
  const [emailToShow, setEmailToShow] = useState("hurstsuzanna@gmail.com");
  console.log("emails", emails);
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
    console.log("etp", emailsToPush);
    // setEmails((emails) => [...emails, emailsToPush]);
  };

  // Select which email to view the results of
  const handleSelectChange = (event) => {
    setEmailToShow(event.target.value);
  };

  if (loading) return "Loading...";
  if (error) return `Loading error! ${error.message}`;
  return (
    <>
      <main>
        <h2>This is the Results page</h2>
        <p> Look at results for email address:</p>
        <div className="optionWrapper">
          <select value={emailToShow} onChange={handleSelectChange}>
            {" "}
            {/* //set value here */}
            {emails.map((email, inx) => {
              return (
                <option value={email} key={inx}>
                  {email}
                </option>
              );
            })}
          </select>
        </div>

        <UserResults email={emailToShow} />
        {/* <AllResults /> */}
      </main>
      <Footer />
    </>
  );
};

export default Results;
