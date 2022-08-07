import { inferQueryOutput } from "@/utils/trpc";
import { MdBluetoothSearching } from "react-icons/md";
import Link from "next/link";

import { IoArrowRedoSharp } from "react-icons/io5";

type allBlogsType = inferQueryOutput<"blogs.getAllBlog">;

export const BlogCard: React.FC<{
  blog: allBlogsType[number];
}> = (props) => {
  return (
    <Link href={`/blog/${props.blog.id}`}>
      <div className="flex flex-col justify-between cursor-pointer hover:scale-105 transition-all p-4 text-justify shadow-md rounded">
        <div className="">
          <div className="text-2xl pb-4 font-bold dark:text-cyan-300 text-blue-800">
            {props.blog.title}
          </div>
          <div className="text-lg pb-4">{props.blog.description}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg">
            Author: <span className="font-semibold italic">{props.blog.author}</span>
          </div>
          <IoArrowRedoSharp size="24" />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
