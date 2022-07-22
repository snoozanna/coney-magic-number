import { getCollection, db, deleteOne, getOne, findResults } from "./main.js";

const resultsMount = document.getElementById("resultsMount");

const results = await getCollection(db, "results");

export const getCodenames = async (group) => {
  const groupData = await getOne(db, "groups", `${group}`);
  console.log(groupData, "groupData");
  const { codenames } = groupData;

  return codenames;
};

getCodenames("Group 1");

const renderResults = async (group) => {
  const codenames = await getCodenames(group);
  for (const codename in codenames) {
    const results = await findResults(group, codename);
    console.log("results", results);
    // const resultText = `<li class="list-group-item"><h2>${firstName} ${lastName}</h2><p><span>What group are you in?</span><span>${groupSelect}</span></p><p><span>How do you feel on a scale of 1-10?</span><span>${feel}</span></></><p><span>Why?</span> <span>${reasonFeel}</span></p></li>`;
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
