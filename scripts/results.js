import {
  getCollection,
  db,
  deleteOne,
  getOne,
  findResults,
  getDate,
} from "./main.js";

const resultsMount = document.getElementById("resultsMount");

// const results = await getCollection(db, "results");

export const getCodenames = async (group) => {
  const groupData = await getOne(db, "groups", `${group}`);
  console.log(groupData, "groupData");
  const { codenames } = groupData;

  return codenames;
};

getCodenames("Group 1");

const renderResults = async (group) => {
  const codenames = await getCodenames(group);
  for (const codename of codenames) {
    const results = await findResults(group, codename);
    const { feel, firstName, lastName, reasonFeel, feel2, reasonFeel2 } =
      results;
    console.log("results", getDate(reasonFeel.timestamp.seconds));
    const noDate = "No date";
    // console.log("reasonFeel", getDate(reasonFeel.timestamp.seconds));
    const resultText = `<li class="list-group-item">
    <h2>Codename: ${codename}, ${group}</h2> 
    <p><span>Name:</span><span> ${firstName.answer} ${
      lastName.answer
    }</span></p><h3>First Answers (Date ${
      reasonFeel.timestamp.seconds
        ? getDate(reasonFeel.timestamp.seconds)
        : noDate
    })</h3>
    <p><span>How do you feel on a scale of 1-10?</span><span>${
      feel.answer
    }</span></p><p><span>Why?</span> <span>${reasonFeel.answer}</span></p>
    <h3>Second Answers (Date ${
      reasonFeel2.timestamp.seconds
        ? getDate(reasonFeel2.timestamp.seconds)
        : noDate
    })</h3>
    <p><span>How do you feel on a scale of 1-10 now?</span><span>${
      feel2.answer
    }</span></p>
    <p><span>What changed for you?</span><span>${
      reasonFeel2.answer
    }</span></p></li>`;
    resultsMount.innerHTML += resultText;
  }
};

await renderResults("Group 1");

// TODO fix nodisplay

// renderResults("Group 1");

// const renderResults = (results) => {
//   if (!results?.length) {
//     const noDisplay = "<p>No results to display...</p>";
//     resultsMount.innerText = noDisplay;
//   } else if (results != null && Array.isArray(results)) {
//     results.map((result) => {
//       const { firstName, lastName, feel, reasonFeel, groupSelect, _id } =
//         result;
//       const resultText = `<li class="list-group-item"><h2>${firstName} ${lastName}</h2><p><span>What group are you in?</span><span>${groupSelect}</span></p><p><span>How do you feel on a scale of 1-10?</span><span>${feel}</span></></><p><span>Why?</span> <span>${reasonFeel}</span></p></li>`;
//       const delBtn = document.createElement("button");
//       delBtn.innerText = "Delete";
//       console.log(_id);
//       delBtn.addEventListener("click", () => {
//         // console.log("hi");
//         // console.log(this);
//         deleteOne(_id, "results");
//       });

//       resultsMount.innerHTML += resultText;
//       resultsMount.append(delBtn);
//     });
//   }
// };

// renderResults("Group 1");

// Add delete function
// Add filter by group function

// <h3>
//   First Answers (Date $
//   {reasonFeel.timestamp.seconds
//     ? "no date"
//     : getDate(reasonFeel.timestamp.seconds)}
//   )
// </h3>;

// <h3>
//   Second Answers (Date $
//   {reasonFeel2.timestamp.seconds
//     ? "no date"
//     : getDate(reasonFeel2.timestamp.seconds)}
//   ){" "}
// </h3>;
