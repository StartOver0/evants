// import {use} from 'next-auth/react';
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import styles from "/styles/Organize.module.css";
import userClubs from "/staticData/userClubs";
import { db } from "../../lib/firebase";
import { UserContext } from "../../lib/Context";
import { useForm } from "react-hook-form";
import PreviewPage from "../../components/PreviewPage/previewPage";
import { doc } from "firebase/firestore";

export default function Organize() {
  const { user, username } = useContext(UserContext);
  const Router = useRouter();
  const { register, handleSubmit, reset, watch } = useForm({
    mode: "onChange",
  });
  const [preview, setPreview] = useState(false);
  const { slug } = Router.query;

  const postRef = doc(db, "users", user.uid, "posts", "abc");

  let handleFormSubmit = (e) => {
    e.preventDefault();
  };
  return preview ? (
    <PreviewPage />
  ) : (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <h2>Event Details:</h2>

        <div className={styles.outer_div}>
          <div>
            <label htmlFor="club">Select Club:</label>
            <select name="club">
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
              type="text"
              id="venue"
              name="venue"
              spellCheck="false"
              required
            />
          </div>
          <div>
            <label htmlFor="teamSize">Team Size:</label>
            <input
              type="text"
              id="teamSize"
              name="teamSize"
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
              type="text"
              id="googleFormLink"
              name="googleLinkForm"
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
                  className={styles.name}
                  name="name1"
                  placeholder="Name1"
                  spellCheck="false"
                  required
                />
                <input
                  type="text"
                  className={styles.contact}
                  name="contact1"
                  placeholder="Contact No. 1"
                  spellCheck="false"
                  required
                />
              </div>
              <div className={styles.inner_div}>
                <input
                  type="text"
                  className={styles.name}
                  name="name2"
                  placeholder="Name2"
                  spellCheck="false"
                />
                <input
                  type="text"
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
              name="extra_notes"
              id="extra_notes"
              rows="4"
              spellCheck="false"
            ></textarea>
          </div>
        </div>

        <button className={styles.button}>Proceed</button>
      </form>
    </div>
  );
}
