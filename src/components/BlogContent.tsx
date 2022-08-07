import { inferQueryOutput } from "@/utils/trpc";
import Image from "next/image";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Comment from '@/components/Comments'

type blogContent = inferQueryOutput<"blogs.getSingleBlog">;

const Blog: React.FC<{
  blog: blogContent;
}> = (props) => {
  return (
    <div className="flex justify-center m-8">
      <div className="flex flex-col justify-center shadow-xl items-center ">
        <div className="block w-full h-fit min-h-fit">
          <Image
            layout="responsive"
            width='16px'
            height='9px'
            src={
              props.blog?.BlogContent[0]?.headerImage
                ? props.blog?.BlogContent[0]?.headerImage
                : "https://storage.googleapis.com/cp_bucket_test/8KKpE4bnrgPr_BSjdodjBBS01657346517231.png"
            }
            alt="Main image"
          />
        </div>
        <div className="text-4xl p-4 font-black dark:text-primary-light text-primary-dark">{props.blog?.title}</div>
        
        <div className="prose prose-xl px-8 dark:prose-invert text-justify">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {props.blog?.BlogContent[0]?.content
              ? props.blog?.BlogContent[0]?.content
              : "Not available"}
          </ReactMarkdown>
        </div>
        <Comment />
        <div>{props.blog?.BlogContent[0]?.comments[0]?.message}</div>
      </div>
    </div>
  );
};

export default Blog;
