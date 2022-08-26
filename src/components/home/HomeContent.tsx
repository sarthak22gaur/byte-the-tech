import { BlogCard } from "@/components/blog/BlogCard";
import { inferQueryOutput } from "@/utils/trpc";

type getAllBlogQueryOutput = inferQueryOutput<"blogs.getAllBlogs">;

const HomeContent: React.FC<{ allBlogs: getAllBlogQueryOutput }> = (props) => {
  return (
    <main className="h-full">
      <div className="w-full flex justify-center items-center">
        <div className="max-w-[80vw] 2xl:max-w-mw grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8 m-8">
          {props.allBlogs.items.map((curr, index) => {
            return <BlogCard blog={curr} key={index} />;
          })}
        </div>
      </div>
    </main>
  );
};
export default HomeContent;
