import Avatar from "/components/Avatar/avatar";
import { data } from "/staticData/profiledata.js";
const subheadings = ["upcoming events", "past events"];
import { articles } from "/staticData/article.js";
import BlogPreview from "../../components/blogPreview/blogPreview";

export default function Home() {
  return (
    <div>
      <Avatar {...data} />
      <BlogPreview {...articles} />
    </div>
  );
}
