import {
  addGroup,
  db,
  getCollection,
  deleteOne,
  getOne,
  addCodename,
} from "./main.js";

import {
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore-lite.js";

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

      // TODO FIX DELETE
      const delBtn = document.createElement("button");
      delBtn.textContent = `Delete ${_id}`;

      delBtn.addEventListener("click", (e) => {
        console.log("hi");
        e.preventDefault();
        const consent = window.confirm(
          "Are you sure you want to delete all the players?",
        );
        if (consent) {
          deleteOne(_id, "groups");
        }
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
    const groupRef = doc(db, `groups/${group}`);
    const groupSnap = await getDoc(groupRef);
    if (groupSnap.exists()) {
      console.log("Document data:", groupSnap.data());
      const data = groupSnap.data();
      const codenameMount = document.getElementById("codenameMount");
      codenameMount.innerHTML = `Groupname: ${data.groupName}`;
      data.codenames.map((codename) => {
        codenameMount.innerHTML += `<span>${codename}</span>`;
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (err) {
    alert("There was a problem rendering your group");
    return Promise.reject(err.message);
  }
};

// renderCodenames("Group 4");
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
  return group;
});
// TODO FIX

choicesMount.innerHTML = "";
choicesMount.append(select);

const lbl = document.createElement("label");
lbl.textContent = "Choose your group";

choicesMount.append(lbl);

select.addEventListener("change", (e) => {
  const group = e.target.value;
  renderCodenames(group);
});

// ADD CODENAMES

const codenameForm = document.forms["codenameForm"];

codenameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const codenameInput = document.getElementById("newCodenameInput");
  const newCodename = codenameInput.value;
  log(newCodename);
  if (!select.value) {
    alert("you need to select a group");
  } else {
    const group = select.value;
    addCodename(db, codenameForm, group);
  }
});
