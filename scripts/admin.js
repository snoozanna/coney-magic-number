import {
  addGroup,
  db,
  getCollection,
  deleteOne,
  getOne,
  addCodename,
} from "./main.js";

const { log, dir } = console;

// ADD A GROUP
const groupForm = document.forms["groupForm"];

groupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("groupName");
  const newGroupName = nameInput.value;
  addGroup(db, groupForm, newGroupName);
});

// DISPLAY GROUPS
const groupMount = document.getElementById("groupListMount");
const groups = await getCollection(db, "groups");
console.log("groups", groups);

// TODO fix no display
const renderGroups = (groups) => {
  // if (!groups?.length) {
  //   const noDisplay = "No groups to display...";
  //   groupMount.innerText = noDisplay;
  // } else
  if (groups != null && Array.isArray(groups)) {
    groups.map((group) => {
      // console.log(group._id);
      const { _id } = group;
      const groupText = `<div class="group-container" id="groupContainer"><p>${_id}</p></div>`;
      groupMount.innerHTML += groupText;

      const delBtn = document.createElement("button");
      delBtn.innerText = `Delete ${_id}`;
      delBtn.addEventListener("click", (e) => {
        e.preventDefault();
        deleteOne(_id, "groups");
      });
      groupMount.appendChild(delBtn);
    });
  }
};

renderGroups(groups);

//DISPLAY CODENAMES

// const testGroup = await getCollection(db, `groups/Group 1/ben`);
// log("testGroup", testGroup);

const renderCodenames = async (group) => {
  // if (!codenames?.length) {
  //   const noDisplay = "No codenames to display...";
  //   codenameMount.innerText = noDisplay;
  // } else

  console.log("group to render", group);
  try {
    const groupData = await getCollection(db, `groups/${group._id}/ben`);
    console.log("groupData", groupData);
  } catch (err) {
    alert("There was a problem rendering your group");
    return Promise.reject(err.message);
  }

  const codenameMount = document.getElementById("codenameMount");
  codenameMount.innerHTML = `Groupname: ${group._id}`;
  for (const codename in group) {
    console.log("codename", codename);
    codenameMount.innerHTML += `<span>${codename}</span>`;
    // const delBtn = document.createElement("button");
    // delBtn.innerText = `Delete ${codename}`;
    // delBtn.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   deleteOne(codename, "School");
    // });
    // codenameMount.appendChild(delBtn);
  }
};

// let group = "mygroup";
// let groupData = await getCollection(db, "mygroup");
// log("groupData", groupData);
// renderCodenames("mygroup");

// POPULATE GROUPS INTO CODENAMES SELECT

const choicesMount = document.getElementById("group-choices");
const select = document.createElement("select");
const holdingOption = document.createElement("option");
holdingOption.textContent = "Choose group";
holdingOption.setAttribute("disabled", "disabled");
holdingOption.setAttribute("selected", "selected");
holdingOption.setAttribute("value", "");
select.append(holdingOption);

groups.map((group) => {
  const opt = document.createElement("option");
  opt.textContent = group._id;
  opt.setAttribute("value", group._id);
  select.append(opt);
  select.addEventListener("change", (e) => {
    renderCodenames(group);
  });
  return group;
});

// TODO FIX

choicesMount.innerHTML = "";
choicesMount.append(select);

const lbl = document.createElement("label");
lbl.textContent = "Choose your group";

choicesMount.append(lbl);

// ADD CODENAMES

const codenameForm = document.forms["codenameForm"];

codenameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const codenameInput = document.getElementById("newCodenameInput");
  const newCodename = codenameInput.value;
  log(newCodename);
  addCodename(db, codenameForm, "Group 1");
});
