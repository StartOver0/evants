import { DateTime } from "luxon";
import { db } from "../../../lib/firebase";
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  collectionGroup,
} from "firebase/firestore";

export default async (req, res) => {
  let cpost = await getDocs(collectionGroup(db, "hEvents"));
  for (const element of cpost.docs) {
    if (!isRight(element.data())) {
      await del(db, element);
    }
  }
  let adminPosts = await getDocs(collectionGroup(db, "aEvents"));
  for (const element of adminPosts.docs) {
    if (!isRight(element.data())) {
      await dele(db, element);
    }
  }
  res.status(200).send("yes");
};
async function del(db, dc) {
  let name = dc.data().slug;
  let ref = doc(
    collection(db, `homeEvents/${dc.data().username}/hEvents`),
    name
  );
  await deleteDoc(ref);
}
async function dele(db, dc) {
  let name = dc.data().slug;
  let ref = doc(
    collection(db, `adminEvents/${dc.data().username}/aEvents`),
    name
  );
  await deleteDoc(ref);
}
function isRight(data) {
  let reg = /(\d{4})-(\d{1,2})-(\d{1,2})/;
  let arr1 = data.date.match(reg);
  let arr2 = data.edate.match(reg); //year month date

  let today = DateTime.now().setZone("Asia/kolkata");
  let endingDate = DateTime.local(
    parseInt(arr2[1]),
    parseInt(arr2[2]),
    parseInt(arr2[3]) + 1
  ).setZone("Asia/kolkata");
  if (endingDate >= today) {
    return true;
  } else {
    return false;
  }
}
