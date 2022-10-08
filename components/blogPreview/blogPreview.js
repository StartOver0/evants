import Link from "next/link";

export default function BlogPreview(props) {
  let articles = Object.values(props);

  return articles.length !== 0 ? (
    <div className="m-auto max-w-[700px]  p-[30px]">
      {articles.map((article, index) => {
        return (
          <Link key={index} href={"/post/" + article.slug}>
            <div key={index} className="pb-[30px] mb-[30px] mt-[20px]">
              <div className="flex justify-between">
                <div className="text-[12px]">{article.date}</div>
                <Link href={`organize/${article.slug}`}>✏️</Link>
              </div>
              <div className="font-bold text-2xl">{article.title}</div>
              <div className="flex">
                <div className="">{article.description}</div>
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
