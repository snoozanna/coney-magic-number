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

const p1Form = document.forms["p1Form"];
console.log("form", p1Form);

p1Form.addEventListener("submit", (e) => {
  e.preventDefault();
  addResult(db, p1Form, "Group 1", myCodename, "page2");
});
