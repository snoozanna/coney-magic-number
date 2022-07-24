import { addResult, db, getOne, getCollection } from "./main.js";
//display codename
const myCodename = window.localStorage.getItem("codename");
const myGroup = window.localStorage.getItem("group");
const myCodenameMount = document.getElementById("myCodenameMount");
const errorCodename =
  "Can't find your codename, please go back to the landing page";
if (!myCodename) {
  myCodenameMount.innerText = errorCodename;
} else {
  myCodenameMount.innerHTML = `<p>Codename: ${myCodename} </p>
  <p>Group: ${myGroup} </p>`;
}

// PREVIOUS ANSWERS
const answers = await getOne(db, `groups/${myGroup}/${myCodename}`, "results");

const { feel, reasonFeel } = answers;
// console.log("feel", feel, reasonFeel.answered);

const feelNumber = parseFloat(feel.answer, 10);
// console.log(feelNumber - 1);

const prevAnswerMount = document.getElementById("prevAnswerMount");
const feelReasonQMount = document.getElementById("feelReasonQMount");

// looks to see if they have already given a reason for the way they feel, if they have, asks the second version of the question.
const getReasonFeelQ = (answered) => {
  if (answered === true) {
    return `<label for="reasonFeel"></label>
        <textarea class="form-control" id="reasonFeel" rows="3" id="reasonFeel" name="reasonFeel2"></textarea>
`;
  } else if (answered === false) {
    return ` <label for="reasonFeel"></label>
        <textarea class="form-control" id="reasonFeel" rows="3" id="reasonFeel" name="reasonFeel"></textarea>`;
  }
};

const getText = (feel, answered) => {
  // console.log("feee", feel);
  if (answered === true) {
    return `<p>Last time, said you were feeling ${feel.answer}</p>
    <p>Quick question, what has changed for you?</p>`;
  } else if (answered === false) {
    return `<p>Quick follow up.</p>
    <p>You said that you were feeling ${feelNumber}</p>
    <p>Why weren't you feeling ${feelNumber - 2}?</p>`;
  }
};

const question = getReasonFeelQ(reasonFeel.answered);
const text = getText(feel, reasonFeel.answered);
prevAnswerMount.innerHTML = text;
feelReasonQMount.innerHTML = question;

// SUBMIT

const p3Form = document.forms["p3Form"];
// console.log("form", p3Form);

p3Form.addEventListener("submit", (e) => {
  e.preventDefault();
  addResult(db, p3Form, "Group 1", myCodename, "thanks");
});
