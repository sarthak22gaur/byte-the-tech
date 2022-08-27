import { HomeCard } from "@/components/home/HomeCard";
import { inferQueryOutput } from "@/utils/trpc";

type getAllBlogQueryOutput = inferQueryOutput<"blogs.getAllBlogs">;

const HomeContent: React.FC<{ allBlogs: getAllBlogQueryOutput }> = (props) => {
  return (
    <main className="h-full">
      <div className="w-full flex justify-center items-center">
        <div className="sm:max-w-[90vw] 2xl:max-w-mw grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8 p-2 sm:p-8 sm:m-8">
          {props.allBlogs.items.map((curr, index) => {
            return <HomeCard blog={curr} key={index} />;
          })}
        </div>
      </div>
    </main>
  );
};
export default HomeContent;
