// Component imports
import { HomeCard } from "@/components/home/HomeCard";

// Utils imports
import { inferQueryOutput } from "@/utils/trpc";

type getAllBlogQueryOutput = inferQueryOutput<"blogs.getAllBlogs">;

const HomeContent: React.FC<{ allBlogs: getAllBlogQueryOutput }> = (props) => {
  return (
    <main className="h-fit">
      <div className="w-full flex justify-center items-center">
        <div className="sm:max-w-[90vw] 2xl:max-w-mw flex flex-wrap justify-evenly gap-8 py-8 p-2 sm:p-8 sm:m-8">
          {props.allBlogs.items.map((curr, index) => {
            return <HomeCard blog={curr} key={index} />;
          })}
        </div>
      </div>
    </main>
  );
};
export default HomeContent;
