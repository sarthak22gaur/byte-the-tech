import Link from "next/link";
import { TiArrowRightOutline } from "react-icons/ti";
import type { TypeBlog } from "@/types/contentful-types";

export const BlogCard: React.FC<{
  blog: TypeBlog;
}> = (props) => {
  const title = props.blog.fields.title;
  const slug = title.trim().toLowerCase().replace(/[ ,]+/g, "-");
  return (
    <Link href={`/blog/${slug}`}>
      <div className="flex flex-col group gap-4 justify-between cursor-pointer sm:hover:scale-105 sm:hover:bg-light-hover sm:dark:hover:bg-dark-hover transition-all p-4 shadow-md rounded">
        <div>
          <div className="text-2xl pb-4 font-bold dark:text-secondary-dark text-secondary-light group-hover:text-accent-light transition-colors">
            {props.blog.fields.title}
          </div>
          <div className="text-lg pb-4 text-primary-light/80 dark:text-secondary-dark/75 group-hover:text-secondary-light dark:group-hover:text-secondary-dark transition-all">
            {props.blog.fields.blogDescription}
          </div>
          {props.blog.fields.blogTags && (
            <div className="text-lg flex gap-2 pb-4">
              {props.blog.fields.blogTags.map((tag, index) => {
                return (
                  <div
                    className="bg-secondary-light-bg dark:bg-dark-hover sm:bg-light-hover sm:group-hover:text-black  sm:group-hover:bg-accent-light px-2 rounded transition-colors"
                    key={index}
                  >
                    {tag}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg font-light">
            Author:{" "}
            <span className="font-bold font-['Dancing_Script']">
              {props.blog.fields.blogAuthor.fields.authorName}
            </span>
          </div>
          <div className="group-hover:text-accent-light transition-all">
            <TiArrowRightOutline size="28" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
