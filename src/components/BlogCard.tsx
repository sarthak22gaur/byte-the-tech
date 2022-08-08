import { inferQueryOutput } from "@/utils/trpc";
import { MdBluetoothSearching } from "react-icons/md";
import Link from "next/link";

import { IoArrowRedoSharp } from "react-icons/io5";

type allBlogsType = inferQueryOutput<"blogs.getAllBlog">;

export const BlogCard: React.FC<{
  blog: allBlogsType[number];
}> = (props) => {
  let tags: Array<string>;

  tags = [];
  if (props.blog.tags && props.blog.tags !== "NULL") {
    tags = props.blog.tags.split(",");
  }

  console.log(tags);

  return (
    <Link href={`/blog/${props.blog.id}`}>
      <div className="flex flex-col group gap-4 justify-between cursor-pointer sm:hover:scale-105 sm:hover:bg-light-hover sm:dark:hover:bg-dark-hover transition-all p-4 text-justify shadow-md rounded">
        <div>
          <div className="text-2xl pb-4 font-bold dark:text-secondary-dark text-secondary-light group-hover:text-accent-light transition-colors">
            {props.blog.title}
          </div>
          <div className="text-lg pb-4 text-primary-light">{props.blog.description}</div>
          {tags && (
            <div className="text-lg flex gap-2 pb-4">
              {tags.map((tag, index) => {
                return <div className="bg-secondary-light-bg dark:bg-dark-hover sm:bg-light-hover sm:group-hover:text-black  sm:group-hover:bg-accent-light px-2 rounded transition-colors" key={index}>{tag}</div>;
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg">
            Author:{" "}
            <span className="font-semibold italic">{props.blog.author}</span>
          </div>
          <div className="group-hover:text-accent-light transition-all">
          <IoArrowRedoSharp size="24" />
          </div>
          
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
