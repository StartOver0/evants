import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
export default function UnAuthBlogPreview(props) {
  let articles = Object.values(props);

  return articles.length !== 0 ? (
    <div className="m-auto max-w-[700px]  p-[30px]">
      {articles.map((article, index) => {
        return (
          <Link key={index} href={"/" + article.username + "/" + article.slug}>
            <div
              key={index}
              className="pb-[30px] hover:bg-slate-300 hover:rounded-lg sm:p-8 p-4   my-[30px]"
            >
              <div className="flex justify-between">
                <div className="text-[12px]">{article.date}</div>
              </div>
              <div className="font-bold text-2xl">{article.title}</div>
              <div className="flex flex-col  sm:text-base text-sm">
                <div className="hyphen-auto">
                  {(() => {
                    let string = "";
                    if (article.description.length <= 260) {
                      string = article.description.substring(
                        0,
                        article.description.length
                      );
                    } else {
                      string = article.description.substring(0, 260);
                      string += "...";
                    }

                    return string;
                  })()}
                </div>
                <div className="flex justify-center pt-1 text-blue-400 hover:text-red-400">
                  <div>Know more</div>
                </div>
              </div>

              <div className="flex pb-[10px]">
                <div className="m-[5px]">
                  {`${
                    Math.ceil(article.description.split(" ").length / 100) +
                    " min read"
                  }`}
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
