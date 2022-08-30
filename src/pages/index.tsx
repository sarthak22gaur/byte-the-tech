import Image from "next/image";
import superjson from "superjson";
import {
  InferGetStaticPropsType,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from "next";

import Navbar from "@/components/Navbar";
import SocialBanner from "@/components/SocialBanner";
import HomeHeader from "@/components/home/HomeHeader";
import HomeContent from "@/components/home/HomeContent";
import { createContext } from "../server/router/context";
import { appRouter } from "../server/router";
import { createSSGHelpers } from "@trpc/react/ssg";
import { trpc } from "@/utils/trpc";

// export const getServerSideProps = async () => {
//   const ssg = createSSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//     transformer: superjson,
//   });

//   await ssg.prefetchQuery("blogs.getAllBlogs");

//   // TODO: error handler
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//     },
//   };
// };

export const getStaticProps = async () => {
    const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  const allBlogs = await ssg.fetchQuery("blogs.getAllBlogs");

  // TODO: error handler
  return {
    props: {
      trpcState: ssg.dehydrate(),
      allBlogs,
    },
    revalidate: 1,
  };

}

const Home = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  // const allBlogs = trpc.useQuery(["blogs.getAllBlogs"]);
  // if (!allBlogs.data) {
  //   return <div>Loading..</div>;
  // }

  return (
    <>
      <Navbar />
      <HomeHeader />
      <HomeContent allBlogs={props.allBlogs} />
    </>
  );
};

export default Home;
