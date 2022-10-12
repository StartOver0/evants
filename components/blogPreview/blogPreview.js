import Link from "next/link";
import { UserContext } from "/lib/Context";
import { useContext } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { auth } from "../../lib/firebase";
export default function BlogPreview(props) {
  const { user, username } = useContext(UserContext);
  let articles = Object.values(props);
  return articles.length !== 0 ? (
    <div className="m-auto max-w-[700px]  p-[30px]">
      {articles.map((article, index) => {
        return (
          <Link key={index} href={"/" + username + "/" + article.slug}>
            <div
              key={index}
              className="pb-[30px] hover:bg-slate-300 hover:rounded-lg sm:p-8 p-4   my-[30px]"
            >
              <div className="flex justify-between">
                <div className="text-[12px]">{article.date}</div>
                <div className="text-red-600 hover:text-red-900">
                  <Link href={`organize/${article.slug}`}>Edit</Link>
                </div>
              </div>
              <div className="font-bold text-2xl">{article.title}</div>
              <div className="flex flex-col  sm:text-base text-sm">
                <div className="hyphen-auto">
                  {(() => {
                    let ar = article.description.split(" ");
                    let a = 0;
                    let string = "";
                    ar.forEach((element) => {
                      if (a <= 40) {
                        string += " " + element;
                      }
                      if (a == 41) {
                        string += "...";
                      }
                      a++;
                    });
                    return string;
                  })()}
                </div>
                <div className="flex justify-center pt-1 text-blue-400 hover:text-red-400">
                  <div>Know more</div>
                </div>
              </div>

              <div className="flex pb-[10px] justify-between">
                <div className="m-[5px]">
                  {`${
                    Math.ceil(article.description.split(" ").length / 100) +
                    " min read"
                  }`}
                </div>
                <div title="published" className="text-green-400">
                  {article.published && "📢"}
                </div>
              </div>
              <div className="bg-black h-[0.1px] w-[100%]"></div>
            </div>
          </Link>
        );
      })}
    </div>
  ) : (
    <div className="h-[30vh] text-green-400 flex items-center justify-center">
      <div>{"You havn't organize anything yet"}</div>
    </div>
  );
}
