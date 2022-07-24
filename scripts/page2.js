import { addResult, db, getOne } from "./main.js";

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

// which feel to display
const answers = await getOne(db, `groups/${myGroup}/${myCodename}`, "results");

const { feel, reasonFeel } = answers;
console.log("feel", feel);
const feelQMount = document.getElementById("feelQMount");

const getFeelQ = (answered) => {
  if (answered === true) {
    return ` <label for="feel"></label>
          <input type="range" class="form-control" placeholder="Feel" id="feel" name="feel2" min="1" max="10"
            value="5" step="0.1" >`;
  } else if (answered === false) {
    return ` <label for="feel"></label>
          <input type="range" class="form-control" placeholder="Feel" id="feel" name="feel" min="1" max="10"
            value="5" step="0.1" >`;
  }
};

const text = getFeelQ(reasonFeel.answered);
feelQMount.innerHTML = text;

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
