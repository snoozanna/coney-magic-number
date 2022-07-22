import {
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore-lite.js";
import { db, getOne, getCollection, findCodename } from "./main.js";

const { log, dir } = console;

// QUERY CODENAME

const codenameForm = document.forms["codenameEntryForm"];
const codeNameInput = document.getElementById("codenameInput");

codenameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const codenameQuery = codeNameInput.value;
  findCodename(codenameQuery, "Group 1");
});
