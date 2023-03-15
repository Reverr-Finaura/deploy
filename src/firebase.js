import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { DocumentReference, getFirestore } from "firebase/firestore";
import {
  doc,
  getDocs,
  updateDoc,
  query,
  where,
  setDoc,
  collection,
  getDoc,
} from "firebase/firestore";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, analytics,storage };

export const getUserFromDatabase = async (email) => {
  //let User;
  const docRef = doc(db, "Users", email);
  const docSnap = await getDoc(docRef);
  //console.log(docSnap.data(), "docSnap");
  return docSnap.data();
};

export const getUserDocByRef = async (DocumentReference) => {
  const userDocSnapshot = await getDoc(DocumentReference);
  return userDocSnapshot.data();
}



export const getMentorFromDatabase = async (email) => {
  let Mentor;
  await (
    await getDocs(
      query(collection(db, "Users"), where("email", "==", `${email}`))
    )
  ).forEach((doc) => {
    Mentor = { ...doc.data() };
  });
  return Mentor;
};

export const getMentorMsgs = async (email) => {
  try {
    let clients = [];

    await (
      await getDocs(collection(db, `Messages/${email}/YourClients`))
    ).forEach((doc) => {
      clients.push({ ...doc.data(), email: doc.id });
    });

    console.log(clients);
    return clients;
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const getClientMsgs = async (email) => {
  try {
    let clients = [];

    await (
      await getDocs(collection(db, `Messages/${email}/YourMentors`))
    ).forEach((doc) => {
      clients.push({ ...doc.data(), email: doc.id });
    });
    return clients;
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const addMsgsInMentorDatabase = async (
  mentorEmail,
  clientEmail,
  data
) => {
  try {
    return await setDoc(
      doc(db, `Messages/${mentorEmail}/YourClients`, `${clientEmail}`),
      data
    );
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const addMsgsInClientDatabase = async (
  clientEmail,
  mentorEmail,
  data
) => {
  try {
    return await setDoc(
      doc(db, `Messages/${clientEmail}/YourMentors`, `${mentorEmail}`),
      data
    );
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const updateMsgsInMentorDatabase = async (
  mentorEmail,
  clientEmail,
  updatedData
) => {
  try {
    const docRef = `Messages/${mentorEmail}/YourClients`;
    return await updateDoc(doc(db, docRef, clientEmail), updatedData);
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const updateMsgsInClientDatabase = async (
  clientEmail,
  mentorEmail,
  updatedData
) => {
  try {
    const docRef = `Messages/${clientEmail}/YourMentors`;
    return await updateDoc(doc(db, docRef, mentorEmail), updatedData);
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const uploadMedia = async (media, path) => {
  try {
    await uploadBytesResumable(ref(storage, `${path}/${media.name}`), media);
    const getMedia = await ref(storage, `${path}/${media.name}`);
    const mediaLink = await getDownloadURL(getMedia);
    return mediaLink;
  } catch (err) {
    console.log("Err: ", err);
    
  }
};
