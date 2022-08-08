import { inferQueryOutput } from "@/utils/trpc";
import Image from "next/image";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {AiFillTags} from 'react-icons/ai'

import CommentsCard from "@/components/CommentsCard";

type blogContent = inferQueryOutput<"blogs.getSingleBlog">;
type getALLCommentsQueryOutput = inferQueryOutput<'comment.getCommentsOnPost'>;

const Blog: React.FC<{
  blog: blogContent;
  comments: getALLCommentsQueryOutput; 
}> = (props) => {

  let tags: Array<string>;
  tags = [];
  if (props.blog && props.blog.tags && props.blog.tags !== "NULL") {
    tags = props.blog.tags.split(",");
  }
  return (
    <div className="w-full max-w-3xl flex flex-col justify-center gap-8 p-8">
      <div className="flex flex-col justify-center shadow-lg items-center p-4">
        <div className="block w-full h-fit">
          <Image
            layout="responsive"
            width={16}
            height={9}
            src={
              props.blog?.BlogContent[0]?.headerImage
                ? props.blog?.BlogContent[0]?.headerImage
                : "https://storage.googleapis.com/cp_bucket_test/8KKpE4bnrgPr_BSjdodjBBS01657346517231.png"
            }
            alt="Main image"
          />
        </div>
        <div className="text-4xl p-4 font-black dark:text-secondary-dark text-primary-dark">
          {props.blog?.title}
        </div>
        {tags && (
            <div className="text-lg items-center flex gap-4 pb-4">
              {/* <AiFillTags className="" size={24}/> */}
              {tags.map((tag, index) => {
                return (
                  <div
                    className="bg-secondary-light-bg dark:bg-accent-light px-2 rounded transition-colors"
                    key={index}
                  >
                    {tag}
                  </div>
                );
              })}
            </div>
          )}
      </div>
      <div className="flex flex-col justify-center shadow-xl items-center p-4">
        <article className="prose prose-sm sm:prose-base lg:prose-xl xl:prose-xl dark:prose-invert text-justify">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {props.blog?.BlogContent[0]?.content
              ? props.blog?.BlogContent[0]?.content
              : "Not available"}
          </ReactMarkdown>
        </article>
      </div>
      <div className="flex flex-col text-justify shadow-lg p-8">
        <CommentsCard comments={props.comments} blogId={props.blog?.id ? props.blog.id : '1234'}/>
      </div>
    </div>
  );
};

export default Blog;
