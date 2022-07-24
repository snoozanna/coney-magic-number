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
  /// TODO FIX TIMESTAMP ERROR FOR UNITIATED ENTRIES
  const codenames = await getCodenames(group);
  for (const codename of codenames) {
    const results = await findResults(group, codename);
    const { feel, firstName, lastName, reasonFeel, feel2, reasonFeel2 } =
      results;
    // console.log("results", getDate(reasonFeel.timestamp.seconds));
    // console.log("results", results);
    if (!reasonFeel.timestamp) {
      console.log("doesn't exist", codename);
      const reasonFeelDate = "No Date";
      // return reasonFeelDate;
    } else if (reasonFeel.timestamp) {
      console.log("does exist", codename);
      // const reasonFeelDate = getDate(reasonFeel.timestamp.seconds);
      // const reasonFeelDate = "hello";
      // return reasonFeelDate;
    }
    // console.log("reasonfeeldate", reasonFeelDate);
    const noDate = "No date";
    // console.log("reasonFeel", getDate(reasonFeel.timestamp.seconds));
    const resultText = `<li class="list-group-item">
    <p><span class="title-answer">${group}</span><span>Codename: ${codename}</span></p>
    <p>Name: <span class="answer">${firstName.answer} ${lastName.answer}</span></p>

    <p>How do you feel on a scale of 1-10? <span class="answer">${feel.answer} </span></p>
    <p>Why?  <span class="answer">${reasonFeel.answer}</span> </p>
 
    <p>How do you feel on a scale of 1-10 now? <span class="answer">${feel2.answer}</span> </p>
    <p>What changed for you? <span class="answer">${reasonFeel2.answer}</span> </p></li>`;
    resultsMount.innerHTML += resultText;
  }
};

await renderResults("Group 1");

// TODO fix nodisplay

// Add delete function
// Add filter by group function

// <h3 class="title-answer"> Second Answers (Date ${reasonFeelDate})</h3>;

// <h3 class="title-answer"> First Answers (Date ${reasonFeelDate})</h3>;
