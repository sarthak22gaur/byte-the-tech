import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { BlogInfoCard } from "@/components/blog/BlogInfo";
import CommentsCard from "@/components/CommentsCard";
import { inferQueryOutput } from "@/utils/trpc";
import type { TypeBlog } from "@/types/contentful-types";

const Blog: React.FC<{
  blog: TypeBlog;
}> = (props) => {
  return (
    <div className="w-full md:max-w-[75vw] lg:max-w-[65vw] flex flex-col justify-center gap-8 p-8">
      <header className="flex flex-col justify-center shadow-lg items-center p-4">
        <div className="block w-full h-fit">
          <Image
            layout="responsive"
            width={16}
            height={9}
            src={"https:" + props.blog.fields.heroImage.fields.file.url}
            alt="Main image"
          />
        </div>
        <div className="text-4xl p-4 font-black dark:text-secondary-dark text-primary-dark">
          {props.blog.fields.title}
        </div>
        <div className="text-lg items-center flex gap-4 pb-4">
          {props.blog.fields.blogTags.map((tag, index) => {
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
      </header>
      <div className="flex flex-col justify-center shadow-xl items-center p-4">
        <article className="prose  max-w-none prose-sm sm:prose-base lg:prose-xl xl:prose-xl dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {props.blog.fields.blogContent}
          </ReactMarkdown>
        </article>
      </div>

      <BlogInfoCard blog={props.blog} />
      
      <section className="flex flex-col shadow-lg p-2 sm:p-8">
        <CommentsCard
          blogId={props.blog.sys.id}
        />
      </section>
    </div>
  );
};

export default Blog;
