import { inferQueryOutput } from "@/utils/trpc";
import { MdBluetoothSearching } from "react-icons/md";
import Link from "next/link";

import { IoArrowRedoSharp } from "react-icons/io5";

type allBlogsType = inferQueryOutput<"blogs.getAllBlog">;

const BlogGrid: React.FC<{
  blogs: allBlogsType;
}> = (props) => {
  {
    return (
      <div className="flex gap-8 flex-wrap">
        {props.blogs.map((curr, index) => {
          return <BlogCard blog={curr} key={index} />;
        })}
      </div>
    );
  }
};

export const BlogCard: React.FC<{
  blog: allBlogsType[number];
}> = (props) => {
  return (
    <Link href={`/blog/${props.blog.id}`}>
      <div className=" cursor-pointer px-6 py-6 md:px-10 md:w-1/3 flex flex-col gap-4 items-stretch justify-between text-justify border-b-2 rounded">
        <div className="flex flex-col gap-4">
          <div className="text-2xl font-bold dark:text-cyan-300 text-blue-800">
            {props.blog.title}
          </div>
          <div className="text-lg py-2">{props.blog.description}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg font-light">
            Author: <span>{props.blog.author}</span>
          </div>
          <IoArrowRedoSharp size="24" />
        </div>
      </div>
    </Link>
  );
};

export default BlogGrid;
