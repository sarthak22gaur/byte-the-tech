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
import HomeHeader from "@/components/home/HomeHeader";
import HomeContent from "@/components/home/HomeContent";
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
      <Navbar />
      <HomeHeader />
      <HomeContent allBlogs={allBlogs.data} />
    </>
  );
};

export default Home;
