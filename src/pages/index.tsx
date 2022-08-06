import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "@/components/Navbar";

import { createContext } from "../server/router/context";

import { appRouter } from "../server/router";
import superjson from "superjson";
import { createSSGHelpers } from "@trpc/react/ssg";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";

import {BlogCard} from "@/components/BlogGrid";

export const getStaticProps = async () => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  const allBlogs = await ssg.fetchQuery("blogs.getAllBlog");

  return {
    props: {
      trpcState: ssg.dehydrate(),
      allBlogs,
    },
    revalidate: 20000,
  };
};

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      
      <div className="flex flex-wrap">
      {props.allBlogs.map((curr, index) => {
         return (<BlogCard blog={curr} key={index} />);
        })}
      </div>
        {/* <BlogGrid blogs={props.allBlogs}/> */}
        

    </>
  );
};

export default Home;
