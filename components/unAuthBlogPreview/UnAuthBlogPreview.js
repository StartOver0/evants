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
          <Link key={index} href={"/" + article.username + "/" + article.slug}>
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
    <div className={styles.container}>
      <div className={styles.heading}>Recent Posts</div>
      
      <div className="h-[32vh] flex flex-col items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="silver" width={80}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg>
        <p style={{color:"silver"}}>{"User hasn't organize anything yet"}</p>
      </div>

    </div>
  );
}
