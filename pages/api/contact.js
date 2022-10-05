import { collection, doc, setDoc } from "firebase/firestore";
import * as nodemailer from "nodemailer";
import { db } from "../../lib/firebase";
export default async (req, res) => {
  const optRef = collection(db, "opt");

  let opt = Math.ceil(Math.random() * 1000000);
  try {
    const { email } = req.body;
    await setDoc(doc(optRef, email), {
      Opt: opt,
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "uitevants@gmail.com",
        pass: "icssdwowqpxpepgl",
      },
    });
    await transporter.sendMail({
      from: "uitevants@gmail.com",
      to: email,

      subject: `text subject`,
      html: `<h1>Otp:- ${opt} </h1>`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message || error.toString() });
  }
  return res.status(200).json({ error: "" });
};
