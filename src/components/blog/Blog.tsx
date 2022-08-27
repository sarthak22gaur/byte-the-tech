import BlogHeader from "@/components/blog/BlogHeader";
import BlogMarkdown from "@/components/blog/BlogMarkdown";
import BlogCard from "@/components/blog/BlogCard";
import Comments from "@/components/comment/Comments";

import type { TypeBlog } from "@/types/contentful-types";

const Blog: React.FC<{
  blog: TypeBlog;
}> = (props) => {
  return (
    <main className="w-full grid px-2 sm:px-0 grid-flow-row grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)_300px] gap-8 sm:max-w-[90vw] 2xl:max-w-mw">
      <div className="col-span-3 w-full col-start-1 lg:col-span-2 lg:col-start-1 flex justify-center lg:justify-start">
        <div className="w-fit">
          <BlogHeader
            blogTitle={props.blog.fields.title}
            fileUrl={props.blog.fields.heroImage.fields.file.url}
            blogTags={props.blog.fields.blogTags}
            createdAt={props.blog.sys.createdAt}
          />
          <div className="block lg:hidden">
          <BlogCard
            authorName={props.blog.fields.blogAuthor.fields.authorName}
            fileUrl={
              props.blog.fields.blogAuthor.fields.authorProfleImage.fields.file
                .url
            }
          />
          </div>
          <BlogMarkdown blogContent={props.blog.fields.blogContent} />
          <Comments blogId={props.blog.sys.id} />
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-1 lg:col-start-3 box-border border-l-2 border-secondary-light-bg dark:border-secondary-dark-bg ">
        <div className="relative inline-block w-full h-full">
          <BlogCard
            authorName={props.blog.fields.blogAuthor.fields.authorName}
            fileUrl={
              props.blog.fields.blogAuthor.fields.authorProfleImage.fields.file
                .url
            }
          />
        </div>
      </div>
    </main>
  );
};

export default Blog;
