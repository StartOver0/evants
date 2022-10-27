import AuthCheck from "/components/AuthCheck/AuthCheck";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "/styles/Organize.module.css";
import { auth, db } from "../../lib/firebase";
import { UserContext } from "../../lib/Context";
import processing from "/public/images/processing.png";
import Image from "next/image";
import { DateTime } from "luxon";
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
  writeBatch,
} from "firebase/firestore";

import toast from "react-hot-toast";
import Link from "next/link";
export default function CreatePost(props) {
  const { user, username } = useContext(UserContext);
  const [defaultValues, setDefaultValues] = useState();
  const [allclubs, setallclubs] = useState();
  const Router = useRouter();
  let [loading, setloading] = useState(true);
  useEffect(() => {
    (async () => {
      if (user) {
        const { slug } = Router.query;

        let clubs = (
          await getDoc(doc(collection(db, "club"), "clubname"))
        ).data().clubs;
        setallclubs(clubs);
        let ref = doc(collection(db, `users/${user.uid}/events`), slug);
        let value = await getDoc(ref);
        setDefaultValues(value.data());
        setloading(false);
      }
    })();
  }, [user]);
  if (loading) {
    return (
      <div className="flex items-center justify-center py-2 h-[80vh] ">
        <Image
          className="w-[40px] h-[30px] animate-spin"
          src={processing}
          alt="something"
        />
      </div>
    );
  }
  return (
    <AuthCheck>
      {defaultValues && (
        <PostManger clubs={allclubs} defaultValues={defaultValues} />
      )}
    </AuthCheck>
  );
}
function compareTime(date, edate) {
  let reg = /(\d{4})-(\d{1,2})-(\d{1,2})/;
  let arr1 = date.match(reg);
  let starting = DateTime.local(
    parseInt(arr1[1]),
    parseInt(arr1[2]),
    parseInt(arr1[3])
  ).setZone("Asia/kolkata");
  let arr2 = edate.match(reg);
  let endingDate = DateTime.local(
    parseInt(arr2[1]),
    parseInt(arr2[2]),
    parseInt(arr2[3])
  ).setZone("Asia/kolkata");
  return endingDate >= starting;
}
function PostManger({ defaultValues, clubs }) {
  let [date, setDate] = useState(defaultValues.date);
  let [loading, setloading] = useState(false);
  const Router = useRouter();
  const { user, username } = useContext(UserContext);
  const { register, handleSubmit, reset, watch, formState } = useForm({
    defaultValues,
    mode: "onChange",
  });
  const [checkDate, SetcheckDate] = useState(false);
  const [preview, setPreview] = useState(false);

  let { isValid, isDirty, errors } = formState;

  async function submit() {
    setloading(true);
    try {
      const { slug } = Router.query;
      const adminPostRef = doc(
        collection(db, `adminEvents/${username}/aEvents`),
        slug
      );

      const refreence = doc(collection(db, `users/${user.uid}/events`), slug);
      const batch = writeBatch(db);
      let a = { ...data, updatedAt: serverTimestamp() };
      let c = defaultValues;
      for (let key in a) {
        if (a.hasOwnProperty(key)) {
          c[key] = a[key];
        }
      }
      batch.update(refreence, c);

      batch.set(adminPostRef, c);
      await batch.commit();
      toast.success("Post Updated");
      Router.push("/");
    } catch (err) {
      setloading(false);
      toast.error(err.message.toString());
    }
  }

  useEffect(() => {
    SetcheckDate(!compareTime(watch("date"), watch("edate")));
  }, [watch("edate"), watch("date")]);
  const data = {
    published: false,
    username: username,
    slug: Router.query.slug,
    club: watch("club"),
    date: watch("date"),
    description: watch("description"),
    eligibility: watch("eligibility"),
    fee: watch("fee"),
    edate: watch("edate"),
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
  function isDateIsValid(date) {
    let t = DateTime.now();
    let reg = /(\d{4})-(\d{1,2})-(\d{1,2})/;
    let arr1 = date.match(reg);
    let today = DateTime.local(t.year, t.month, t.day).setZone("Asia/kolkata");
    let starting = DateTime.local(
      parseInt(arr1[1]),
      parseInt(arr1[2]),
      parseInt(arr1[3])
    ).setZone("Asia/kolkata");
    return today <= starting;
  }
  return (
    <div>
      {preview ? (
        <PreviewPage {...data} />
      ) : (
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit(submit)}>
            <div className="text-blue-400 hover:text-red-400">
              <Link href="https://www.markdownguide.org/cheat-sheet#basic-syntax">
                <a target={"blank"}>
                  basic markdown for Description and Additional notes
                </a>
              </Link>
            </div>

            <h2>Event Details:</h2>

            <div className={styles.outer_div}>
              <div>
                <label htmlFor="club">Select Club:</label>
                <select name="club" {...register("club", { required: true })}>
                  {clubs.map((clubName) => (
                    <option key={`clubname${clubName}`} value={clubName}>
                      {clubName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="title">Event Title:</label>
                <input
                  className={errors.title && "m-0"}
                  {...register("title", {
                    maxLength: { value: 150, message: "Title is too long" },
                  })}
                  type="text"
                  id="title"
                  name="title"
                  spellCheck="false"
                  required
                />
                {errors.title && (
                  <p className="text-red-500 text-base">
                    {errors.title.message}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.outer_div}>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  {...register("description", {
                    maxLength: {
                      value: 3500,
                      message: "3500 words are limit of Description",
                    },
                  })}
                  className={errors.description && "m-0"}
                  name="description"
                  id="description"
                  rows="5"
                  spellCheck="false"
                  required
                />
                {errors.description && (
                  <p className="text-red-500 text-base">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="eligibility">Who can Participate?:</label>
                <textarea
                  {...register("eligibility", {
                    maxLength: {
                      value: 100,
                      message: "100 words are limit for Eligibility ",
                    },
                  })}
                  name="eligibility"
                  id="eligiblity"
                  rows="3"
                  className={errors.eligibility && "m-0"}
                  required
                />
                {errors.eligibility && (
                  <p className="text-red-500 text-base">
                    {errors.eligibility.message}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.outer_div}>
              <div>
                <label htmlFor="date">Starting Date:</label>
                <input
                  {...register("date")}
                  onChange={(e) => {
                    if (isDateIsValid(e.target.value)) {
                      SetcheckDate(
                        !compareTime(e.target.value, watch("edate"))
                      );
                      setDate(e.target.value);
                    }
                  }}
                  value={date}
                  type="date"
                  id="date"
                  name="date"
                  spellCheck="false"
                  required
                />
              </div>
              <div>
                <label htmlFor="edate">Ending Date:</label>
                <input
                  {...register("edate")}
                  type="date"
                  id="edate"
                  name="edate"
                  spellCheck="false"
                  required
                />
                {checkDate && (
                  <p className="text-red-500">Dates are not right</p>
                )}
              </div>
              <div>
                <label htmlFor="time">Time:</label>
                <input
                  className={errors.time && "m-0"}
                  {...register("time", {
                    maxLength: {
                      value: 25,
                      message: "25 words are limit for text",
                    },
                  })}
                  type="text"
                  id="time"
                  name="time"
                  placeholder="for ex: 10:00am to 1:00pm"
                  spellCheck="false"
                  required
                />
                {errors.time && (
                  <p className="text-red-500 text-base">
                    {errors.time.message}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.outer_div}>
              <div>
                <label htmlFor="venue">Venue</label>
                <input
                  className={errors.venue && "m-0"}
                  {...register("venue", {
                    maxLength: {
                      value: 35,
                      message: "35 words are limit for venue",
                    },
                  })}
                  type="text"
                  id="venue"
                  name="venue"
                  spellCheck="false"
                  required
                />
                {errors.venue && (
                  <p className="text-red-500 text-base">
                    {errors.venue.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="teamsize">Team Size:</label>
                <input
                  className={errors.teamsize && "m-0"}
                  {...register("teamsize", {
                    maxLength: {
                      value: 20,
                      message: "20 words are limit of TeamSize",
                    },
                  })}
                  type="text"
                  id="teamsize"
                  name="teamsize"
                  placeholder="Use space for more than 1 teamsize"
                  spellCheck="false"
                  required
                />
                {errors.teamsize && (
                  <p className="text-red-500 text-base">
                    {errors.teamsize.message}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.outer_div}>
              <div>
                <label htmlFor="fee">Entry Fee:</label>
                <input
                  className={errors.fee && "m-0"}
                  {...register("fee", {
                    maxLength: {
                      value: 15,
                      message: "15 words are limit for Fee",
                    },
                  })}
                  type="text"
                  id="fee"
                  name="fee"
                  placeholder="Entry Fee"
                  spellCheck="false"
                  required
                />
                {errors.fee && (
                  <p className="text-red-500 text-base">{errors.fee.message}</p>
                )}
              </div>
              <div>
                <div htmlFor="googleFormLink">Google Form Link:</div>
                <input
                  className={errors.googleFormLink && "m-0"}
                  {...register("googleFormLink", {
                    maxLength: {
                      value: 100,
                      message: "100 words are limit for GoogleLink",
                    },
                  })}
                  type="text"
                  id="googleFormLink"
                  name="googleFormLink"
                  placeholder="Registration Link (optional)"
                  spellCheck="false"
                />
                {errors.googleFormLink && (
                  <p className="text-red-500 text-base">
                    {errors.googleFormLink.message}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.outer_div}>
              <div>
                <label htmlFor="first">
                  Contact No:{"  (second number and name is optional)"}
                </label>
                <br />
                <div className={styles.contact}>
                  <div className={styles.inner_div}>
                    <input
                      type="text"
                      {...register("name1", {
                        maxLength: {
                          value: 15,
                          message: "15 words are limit for Name1",
                        },
                      })}
                      className={styles.name}
                      name="name1"
                      placeholder="Name1"
                      spellCheck="false"
                      required
                    />
                    {errors.name1 && (
                      <p className="text-red-500 text-base">
                        {errors.name1.message}
                      </p>
                    )}
                    <input
                      type="number"
                      className={styles.contact}
                      {...register("contact1", {
                        maxLength: {
                          value: 10,
                          message: "Too Long for contact Number",
                        },
                      })}
                      name="contact1"
                      placeholder="Contact No. 1"
                      spellCheck="false"
                      required
                    />
                    {errors.contact1 && (
                      <p className="text-red-500 text-base">
                        {errors.contact1.message}
                      </p>
                    )}
                  </div>
                  <div className={styles.inner_div}>
                    <input
                      {...register("name2", {
                        maxLength: {
                          value: 15,
                          message: "15 words are limit for Name2",
                        },
                      })}
                      type="text"
                      className={styles.name}
                      name="name2"
                      placeholder="Name2(optional)"
                      spellCheck="false"
                    />
                    {errors.name2 && (
                      <p className="text-red-500 text-base">
                        {errors.name2.message}
                      </p>
                    )}
                    <input
                      {...register("contact2", {
                        maxLength: {
                          value: 10,
                          message: "Too long for contact Number",
                        },
                      })}
                      type="number"
                      className={styles.contact}
                      name="contact2"
                      placeholder="Contact No. 2(optional)"
                      spellCheck="false"
                    />
                    {errors.contact2 && (
                      <p className="text-red-500 text-base">
                        {errors.contact2.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.notes}>
              <div>
                <label htmlFor="extra_notes">Additional Notes:</label>
                <textarea
                  className={errors.notes && "m-0"}
                  {...register("notes", {
                    maxLength: {
                      value: 1000,
                      message: "1000 words are limit for Notes",
                    },
                  })}
                  name="notes"
                  id="extra_notes"
                  rows="4"
                  spellCheck="false"
                />
                {errors.notes && (
                  <p className="text-red-500 text-base">
                    {errors.notes.message}
                  </p>
                )}
              </div>
            </div>
            {!loading && (
              <button
                disabled={!isValid || !isDirty || checkDate}
                className={styles.button}
              >
                Send to Admin
              </button>
            )}
            {loading && (
              <div className="flex justify-center">
                <Image
                  className="w-[40px] h-[30px] animate-spin"
                  src={processing}
                  alt="something"
                />
              </div>
            )}
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
              collection(db, `users/${user.uid}/events`),
              slug
            );
            const currentPostref = doc(
              collection(db, `adminEvents/${username}/aEvents`),
              slug
            );

            if (istrue) {
              let batch = writeBatch(db);
              batch.delete(refreence);
              batch.delete(currentPostref);
              batch.commit();
              toast.success("post Deleted");
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
