// import {use} from 'next-auth/react';
import AuthCheck from "/components/AuthCheck/AuthCheck";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "/styles/Organize.module.css";
import userClubs from "/staticData/userClubs";
import { db } from "../../lib/firebase";
import { UserContext } from "../../lib/Context";
import { useForm } from "react-hook-form";
import PreviewPage from "../../components/PreviewPage/previewPage";
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import Link from "next/link";
export default function CreatePost(props) {
  const { user, username } = useContext(UserContext);
  const [defaultValues, setDefaultValues] = useState();
  const Router = useRouter();
  useEffect(() => {
    (async () => {
      if (user) {
        const { slug } = Router.query;
        ref = doc(collection(db, `users/${user.uid}/posts`), slug);
        let value = await getDoc(ref);
        setDefaultValues(value.data());
      }
    })();
  }, [user]);

  let ref;

  return (
    <AuthCheck>
      {defaultValues && <PostManger defaultValues={defaultValues} />}
    </AuthCheck>
  );
}
function PostManger({ defaultValues }) {
  const Router = useRouter();
  const { user, username } = useContext(UserContext);
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues,
    mode: "onChange",
  });
  const [allData, setAllData] = useState({});
  const [preview, setPreview] = useState(false);
  async function submit() {
    try {
      const { slug } = Router.query;
      const refreence = doc(collection(db, `users/${user.uid}/posts`), slug);
      await updateDoc(refreence, {
        ...data,
        updatedAt: serverTimestamp(),
      });
      toast.success("Post Updated");
      Router.push("/");
    } catch (err) {
      toast.error(err.message.toString());
    }
  }
  const data = {
    club: watch("club"),
    date: watch("date"),
    description: watch("description"),
    eligibility: watch("eligibility"),
    fee: watch("eligibility"),
    googleFormLink: watch("googleFormLink"),
    venue: watch("venue"),
    teamsize: watch("teamsize"),
    time: watch("time"),
    title: watch("title"),
    name1: watch("name1"),
    name2: watch("name2"),
    contact1: watch("contact1"),
    contact2: watch("contact2"),
    notes: watch("notes"),
  };
  return (
    <div>
      {preview ? (
        <PreviewPage {...data} />
      ) : (
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit(submit)}>
            <div className="text-blue-400 hover:text-red-400">
              <Link href="https://www.markdownguide.org/cheat-sheet#basic-syntax">
                basic markdown for Description and Additional notes
              </Link>
            </div>

            <h2>Event Details:</h2>

            <div className={styles.outer_div}>
              <div>
                <label htmlFor="club">Select Club:</label>
                <select name="club" {...register("club")}>
                  {userClubs.map((clubName) => (
                    <option key={`clubname${clubName}`} value={clubName}>
                      {clubName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="title">Event Title:</label>
                <input
                  {...register("title")}
                  type="text"
                  id="title"
                  name="title"
                  spellCheck="false"
                  required
                />
              </div>
            </div>
            <div className={styles.outer_div}>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  {...register("description")}
                  name="description"
                  id="description"
                  rows="5"
                  spellCheck="false"
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="eligibility">Who can Participate?:</label>
                <textarea
                  {...register("eligibility")}
                  name="eligibility"
                  id="eligiblity"
                  rows="3"
                  spellCheck="false"
                  required
                ></textarea>
              </div>
            </div>
            <div className={styles.outer_div}>
              <div>
                <label htmlFor="date">Date:</label>
                <input
                  {...register("date")}
                  type="date"
                  id="date"
                  name="date"
                  spellCheck="false"
                  required
                />
              </div>
              <div>
                <label htmlFor="time">Time:</label>
                <input
                  {...register("time")}
                  type="text"
                  id="time"
                  name="time"
                  placeholder="for ex: 10:00am to 1:00pm"
                  spellCheck="false"
                  required
                />
              </div>
            </div>
            <div className={styles.outer_div}>
              <div>
                <label htmlFor="venue">Venue</label>
                <input
                  {...register("venue")}
                  type="text"
                  id="venue"
                  name="venue"
                  spellCheck="false"
                  required
                />
              </div>
              <div>
                <label htmlFor="teamsize">Team Size:</label>
                <input
                  {...register("teamsize")}
                  type="text"
                  id="teamsize"
                  name="teamsize"
                  placeholder="Use space for more than 1 teamsize"
                  spellCheck="false"
                  required
                />
              </div>
            </div>
            <div className={styles.outer_div}>
              <div>
                <label htmlFor="fee">Entry Fee:</label>
                <input
                  {...register("fee")}
                  type="text"
                  id="fee"
                  name="fee"
                  placeholder="Entry Fee"
                  spellCheck="false"
                  required
                />
              </div>
              <div>
                <label htmlFor="googleFormLink">Google Form Link:</label>
                <input
                  {...register("googleFormLink")}
                  type="text"
                  id="googleFormLink"
                  name="googleFormLink"
                  placeholder="Registration Link"
                  spellCheck="false"
                  required
                />
              </div>
            </div>
            <div className={styles.outer_div}>
              <div>
                <label htmlFor="first">Contact No:</label>
                <br />
                <div className={styles.contact}>
                  <div className={styles.inner_div}>
                    <input
                      type="text"
                      {...register("name1")}
                      className={styles.name}
                      name="name1"
                      placeholder="Name1"
                      spellCheck="false"
                      required
                    />
                    <input
                      type="number"
                      className={styles.contact}
                      {...register("contact1")}
                      name="contact1"
                      placeholder="Contact No. 1"
                      spellCheck="false"
                      required
                    />
                  </div>
                  <div className={styles.inner_div}>
                    <input
                      {...register("name2")}
                      type="text"
                      className={styles.name}
                      name="name2"
                      placeholder="Name2"
                      spellCheck="false"
                    />
                    <input
                      {...register("contact2")}
                      type="number"
                      className={styles.contact}
                      name="contact2"
                      placeholder="Contact No. 2"
                      spellCheck="false"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.notes}>
              <div>
                <label htmlFor="extra_notes">Additional Notes:</label>
                <textarea
                  {...register("notes")}
                  name="notes"
                  id="extra_notes"
                  rows="4"
                  spellCheck="false"
                ></textarea>
              </div>
            </div>

            <button className={styles.button}>Send to Admin</button>
          </form>
        </div>
      )}
      <div className="flex justify-center flex-col">
        <button
          className="bg-green-300 p-3 mb-2"
          onClick={() => {
            setPreview(!preview);
          }}
        >
          {preview ? "Go Back" : "Preview"}
        </button>
        <button
          className="bg-red-400 p-3 mb-2"
          onClick={() => {
            let istrue = confirm("Are you sure you want to delete it");
            const { slug } = Router.query;
            const refreence = doc(
              collection(db, `users/${user.uid}/posts`),
              slug
            );

            if (istrue) {
              deleteDoc(refreence);
              toast.success("post Deleeted");
              Router.push("/");
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
