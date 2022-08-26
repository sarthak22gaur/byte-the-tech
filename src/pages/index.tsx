import Image from "next/image";
import superjson from "superjson";
import {
  InferGetStaticPropsType,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from "next";

import { BlogCard } from "@/components/blog/BlogCard";
import Navbar from "@/components/Navbar";
import SocialBanner from "@/components/SocialBanner";
import { createContext } from "../server/router/context";
import { appRouter } from "../server/router";
import { createSSGHelpers } from "@trpc/react/ssg";
import { trpc } from "@/utils/trpc";

export const getServerSideProps = async () => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  await ssg.prefetchQuery("blogs.getAllBlogs");

  // TODO: error handler
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const allBlogs = trpc.useQuery(["blogs.getAllBlogs"]);
  if (!allBlogs.data) {
    return <div>Loading..</div>;
  }

  return (
    <>
      <nav>
        <Navbar />
      </nav>

      <main className="h-full">
        <div className="w-full flex flex-col pt-8 sm:flex-row justify-around items-center bg-secondary-light-bg dark:bg-secondary-dark-bg">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold w-fit sm:w-min px-8">
            Byte The Tech
          </h1>
          <div className="w-full max-w-2xl px-8">
            <Image
              layout="responsive"
              width={600}
              height={400}
              className=""
              src={"https://storage.googleapis.com/cp_bucket_test/homeSVG.svg"}
              alt="Main image"
            />
          </div>
        </div>

        <div className="w-full flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[80vw] py-8 m-8">
            {allBlogs.data.items.map((curr, index) => {
              return <BlogCard blog={curr} key={index} />;
            })}
          </div>
        </div>
      </main>
      <footer>
        <SocialBanner />
      </footer>
    </>
  );
};

export default Home;
