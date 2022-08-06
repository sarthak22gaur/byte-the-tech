import { inferQueryOutput } from "@/utils/trpc";
import { MdBluetoothSearching } from "react-icons/md";
import Link from "next/link"

type allBlogsType = inferQueryOutput<"blogs.getAllBlog">;

const BlogGrid: React.FC<{
  blogs: allBlogsType;
}> = (props) => {
  {
    return (
      <div className="flex flex-wrap gap-8 m-4 justify-center items-center my-8">
        {props.blogs.map((curr, index) => {
          return <BlogCard blog={curr} key={index} />;
        })}
      </div>
    );
  }
};

const BlogCard: React.FC<{
  blog: allBlogsType[number];
}> = (props) => {
  return (
    <div className="flex flex-col p-8 bg-blue-900">      
      <div>{props.blog.title}</div>
      <div>{props.blog.description}</div>
      <div>{props.blog.author}</div>
      <Link href="/">Test</Link>
    </div>
  );
};

export default BlogGrid;
