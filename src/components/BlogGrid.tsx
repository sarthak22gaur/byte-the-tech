import { inferQueryOutput } from "@/utils/trpc";
import { MdBluetoothSearching } from "react-icons/md";
import Link from "next/link"

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
    <div className="px-6 py-6 md:px-10 md:w-1/3 flex flex-col items-start bg-blue-800">      
      <div>{props.blog.title}</div>
      <div>{props.blog.description}</div>
      <div>{props.blog.author}</div>
      <Link href={`/blog/${props.blog.id}`}>Test</Link>
    </div>
  );
};

export default BlogGrid;
