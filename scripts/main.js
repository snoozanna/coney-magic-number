import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  // batch,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  arrayUnion,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore-lite.js";

// require("dotenv").config();

const { log, dir } = console;

// TODO ADD .ENV
// require("dotenv").config();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAhJgAT7f1PfZGWv8QkU_Kg__U16mSRZU",
  // apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "coney-magic-number.firebaseapp.com",
  projectId: "coney-magic-number",
  storageBucket: "coney-magic-number.appspot.com",
  messagingSenderId: "464853085336",
  appId: "1:464853085336:web:96107b383ac6db8e3c34ed",
  measurementId: "G-PXPQ6NJK91",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// FUNCTIONS FOR READING & WRITING

const FBDocToObj = (doc) => ({ ...doc.data(), _id: doc.id });

// Read
// export const getOne = async (id = "", collectionName = "") => {
//   try {
//     return collection(collectionName).get(id);
//   } catch (err) {
//     console.log("Error for getOne: ", err);
//     return Promise.reject(err.message);
//   }
// };

export async function getCollection(db, collectionName) {
  const messageCol = collection(db, collectionName);
  try {
    const messageSnapshot = await getDocs(messageCol);
    const messageList = messageSnapshot.docs.map((doc) => {
      return FBDocToObj(doc);
    });
    log(messageList);
    return messageList;
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export async function getOne(db, collectionName, docName) {
  // console.log("db, collectionName, docName", db, collectionName, docName);
  const messageDoc = doc(db, collectionName, docName);
  try {
    const docSnap = await getDoc(messageDoc);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const messageList = docSnap.data();
      return messageList;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    // const messageList = messageSnapshot.docs.map((doc) => {
    //   return FBDocToObj(doc);
    // });
    // log(messageList);
    // return messageList;
  } catch (err) {
    return Promise.reject(err.message);
  }
}

// // TODO fix input to set the doc and change the

export async function addResult(db, form, group, codename, nextPage) {
  const data = serialize(form);
  console.log("data inside setResult", data);
  console.log("form", form);
  const resultsRef = doc(db, "groups", group, codename, "results");

  try {
    for (const item in data) {
      await updateDoc(resultsRef, item, {
        answer: data[item],
        answered: true,
        timestamp: new Date(),
      });
    }
    // .then(() => {
    //   // Reset the form values
    form.reset();
    alert("Your result has been successfully saved");
    setTimeout(() => {
      window.location.href = `/${nextPage}.html`;
    }, "1000");
  } catch (err) {
    alert("There was a problem saving your result");
    return Promise.reject(err.message);
  }
}

export function serialize(form) {
  // get most things
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Get full values for checkboxes & multi-selects
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const fullData = formData.getAll(key);
      if (fullData.length > 1) {
        data[key] = fullData;
      }
    }
  }

  return data;
}

// Delete

// Delete
export const deleteOne = async (id = "", collectionName = "") => {
  try {
    await deleteDoc(doc(db, collectionName, id));
    console.log("deleting id:", id, "and collection name:", collectionName);
    alert("Result deleted");
    // return messageCol.doc(id).delete();
  } catch (err) {
    alert("Error deleting result");
    return Promise.reject(err.message);
  }
};

// export const deleteMany = async (ids = [], collectionName = "") => {
//   if (!Array.isArray(ids)) {
//     throw new Error(
//       `deleteMany requires an array of string ids: received ${JSON.stringify(
//         ids,
//       )}`,
//     );
//   }

//   try {
//     const batch = db.batch();
//     for (const id of ids) {
//       batch.delete(db.collection(collectionName).doc(id));
//     }
//     return batch.commit();
//   } catch (err) {
//     return Promise.reject(err.message);
//   }
// };

export async function addCodename(db, form, group) {
  const data = serialize(form);
  const groupRef = doc(db, `groups/${group}`);
  const codename = data.codename;
  const codenameRef = collection(db, "groups", group, codename);
  const resultsRef = doc(db, "groups", group, codename, "results");
  try {
    await addDoc(codenameRef, {
      codename: codename,
      claimed: false,
    });
    await setDoc(resultsRef, {
      firstName: { answer: "" },
      lastName: { answer: "" },
      feel: { answer: "", answered: false },
      // feel: { answer: "", reason: "" },
      reasonFeel: { answer: "", answered: false },
      feel2: { answer: "", answered: false },
      reasonFeel2: { answer: "", answered: false },
    }).then(() => {
      // Reset the form values
      updateDoc(groupRef, {
        codenames: arrayUnion(codename),
      });
      form.reset();
      alert("Your codename has been successfully saved");
    });
  } catch (err) {
    alert("There was a problem saving your codename");
    return Promise.reject(err.message);
  }
}

export async function addGroup(db, form, newGroupName) {
  const data = serialize(form);
  try {
    await setDoc(doc(db, "groups", newGroupName), {
      codenames: [],
      groupName: newGroupName,
      dateCreated: new Date(),
    }).then(() => {
      // Reset the form values
      form.reset();
      alert("Your group has been successfully saved");
    });
  } catch (err) {
    alert("There was a problem saving your group");
    return Promise.reject(err.message);
  }
}

// TODO
// addCollection
// will need to add a first codename to initialise - could be toby

// deleteCollection
// addCodename
// deleteCodename

// QUERY CODENAME

export const findCodename = async (codename, group) => {
  console.log("trying to find codename:", codename, "in group:", group);
  const groupData = await getOne(db, "groups", group);
  const { codenames } = groupData;
  if (codenames.includes(codename)) {
    console.log(`codename ${codename} is present`);
    window.localStorage.setItem("codename", codename);
    window.localStorage.setItem("group", group);
    // TODO change claimed to false
    // const personData = await getCollection(db, `groups/${group}/${codename}`);
    // await setDoc(personData[0], {
    //   claimed: false,
    // });
    try {
      // }).then(() => {
      alert("Codename found!");
      setTimeout(() => {
        window.location.href = "/page1.html";
      }, "1000");
      return codename;
    } catch (err) {
      alert("There was a problem changing your claimed status");
      return Promise.reject(err.message);
    }
  } else {
    alert(`codename ${codename} doesn't exist - ask Toby`);
  }
};

// READ RESULTS

export const findResults = async (group, codename) => {
  try {
    const results = await getCollection(db, `groups/${group}/${codename}`);
    // TODO find a better way of doing this
    const myResults = results[0];
    return myResults;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

// CONVERTING TIMESTAMP

export const getDate = (unixTimestamp) => {
  const milliseconds = unixTimestamp * 1000;
  const dateObject = new Date(milliseconds);
  const humanDateFormat = dateObject.toLocaleString();
  console.log(humanDateFormat);
  return humanDateFormat;
};
