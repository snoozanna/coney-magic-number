import { addResult, db } from "./main.js";

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

// range number display

const range = document.getElementById("feel");
const rangeMount = document.getElementById("rangeMount");
rangeMount.innerText = range.value;

range.addEventListener("change", (e) => {
  rangeMount.innerText = range.value;
});

// SUBMIT

const p2Form = document.forms["p2Form"];
console.log("form", p2Form);

p2Form.addEventListener("submit", (e) => {
  e.preventDefault();
  addResult(db, p2Form, "Group 1", myCodename, "page3");
});
