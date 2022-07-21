import { addResult, db } from "./main.js";

const myForm = document.forms["myForm"];
console.log("form", myForm);

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addResult(db, myForm);
});

// range number display

const range = document.getElementById("feel");
const rangeMount = document.getElementById("rangeMount");
rangeMount.innerText = range.value;

range.addEventListener("change", (e) => {
  rangeMount.innerText = range.value;
});
