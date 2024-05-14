import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAi8nMriXzIoeAvu3FSxx5Rtmq46R4PWOA",
  databaseURL:
    "https://embedded-project-group28-e4418-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "embedded-project-group28-e4418",
  projectNumber: "204676097215",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function fetchData() {
  const snapshot = await getDocs(collection(db, "data"));
  const newData = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return newData;
}

export async function getData() {
  const data = await fetchData();
  return data;
}
