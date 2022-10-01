import Image from "next/image";
export default function BlogPreview(props) {
  let articles = Object.values(props);

  return (
    <div className="m-auto max-w-[700px]  p-[30px]">
      {articles.map((article, index) => {
        return (
          <div key={index} className="pb-[30px] mb-[30px] mt-[20px]">
            <div className="text-[12px]">{article.date}</div>
            <div className="font-bold text-2xl">{article.heading}</div>
            <div className="flex">
              <div className="">{article.des}</div>
            </div>
            {props.tag}
            <div className="flex pb-[10px]">
              {article.tags.map((tag, index) => {
                return (
                  <span
                    key={index}
                    className="bg-neutral-200 text-sm rounded-lg m-[5px] p-0"
                  >
                    {tag + " "}
                  </span>
                );
              })}
              <div className="m-[5px]">{article.rTime}</div>
            </div>
            <div className="bg-black h-[0.1px] w-[100%]"></div>
          </div>
        );
      })}
    </div>
  );
}
