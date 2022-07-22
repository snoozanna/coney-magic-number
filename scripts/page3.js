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

const { feel } = answers;

const feelNumber = parseFloat(feel.answer, 10);
console.log(feelNumber - 1);

const prevAnswerMount = document.getElementById("prevAnswerMount");

const text = `<p>You said you were feeling ${feelNumber}</p>
<p>Why weren't you feeling ${feelNumber - 2}?</p>`;

prevAnswerMount.innerHTML = text;

// SUBMIT

const p3Form = document.forms["p3Form"];
console.log("form", p3Form);

p3Form.addEventListener("submit", (e) => {
  e.preventDefault();
  addResult(db, p3Form, "Group 1", myCodename, "thanks");
});
