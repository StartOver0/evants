import Link from "next/link";
import styles from '../blogPreview/blogPreview.module.css'
export default function UnAuthBlogPreview(props) {
  let articles = Object.values(props);

  return articles.length !== 0 ? (  
    <div className={styles.container}>
      <div className={styles.heading}>Recent Posts</div>
    <div >
      {articles.map((article, index) => {
        return (
          <Link key={index} href={`/clubs/${article.club}/${article.username}/${article.slug}`}>
            <div
              key={index}
              className={styles.postitem}
            >
              <div className="flex justify-between">
                <div className="text-[12px] mb-1">{article.date}</div>
              </div>
              <div className="font-bold text-2xl">{article.title}</div>
              <div className="flex flex-col  sm:text-base text-sm">
                <div className="hyphen-auto mt-3">
                  {(() => {
                    let string = "";
                    if (article.description.length <= 200) {
                      string = article.description.substring(
                        0,
                        article.description.length
                      );
                    } else {
                      string = article.description.substring(0, 200);
                      string += "...";
                    }

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
                  { article.published && "📢"}
                </div>
              </div>
              <div className="bg-black h-[0.1px] w-[100%]"></div>
            </div>
          </Link>
        );
      })}
    </div>
    </div>
  ) : (
    <div className="h-[30vh] text-green-400 flex items-center justify-center">
      <div>{"This club hasn't organize anything yet"}</div>
    </div>
  );
}



