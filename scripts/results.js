import { getCollection, db, deleteOne } from "./main.js";

const resultsMount = document.getElementById("resultsMount");

const results = await getCollection(db, "results");

// TODO fix nodisplay
const renderResults = (results) => {
  if (!results?.length) {
    const noDisplay = "<p>No results to display...</p>";
    resultsMount.innerText = noDisplay;
  } else if (results != null && Array.isArray(results)) {
    results.map((result) => {
      const { firstName, lastName, feel, reasonFeel, groupSelect, _id } =
        result;
      const resultText = `<li class="list-group-item"><h2>${firstName} ${lastName}</h2><p><span>What group are you in?</span><span>${groupSelect}</span></p><p><span>How do you feel on a scale of 1-10?</span><span>${feel}</span></></><p><span>Why?</span> <span>${reasonFeel}</span></p></li>`;
      const delBtn = document.createElement("button");
      delBtn.innerText = "Delete";
      console.log(_id);
      delBtn.addEventListener("click", () => {
        // console.log("hi");
        // console.log(this);
        deleteOne(_id, "results");
      });

      resultsMount.innerHTML += resultText;
      resultsMount.append(delBtn);
    });
  }
};

renderResults(results);

// Add delete function
// Add filter by group function
