import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import SocialBanner from "@/components/SocialBanner";

import { createContext } from "@/server/router/context";

import { appRouter } from "@/server/router";
import superjson from "superjson";
import { createSSGHelpers } from "@trpc/react/ssg";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";

import Blog from "@/components/BlogContent";

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string;}>
) => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  const slug = context.params?.slug as string;
  const blog = await ssg.fetchQuery("blogs.getSingleBlog", { blogId: slug });
  const comments = await ssg.fetchQuery('comment.getCommentsOnPost', { blogId: slug });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      blog,
      comments
      //   blogCont
    },
    revalidate: 20000,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  const allBlogs = await ssg.fetchQuery("blogs.getAllBlog");

  return {
    paths: allBlogs.map((blog) => ({
      params: {
        slug: blog.id,
        // title: String(blog.title.split(" ").join("-").toLowerCase()),
      },
    })),
    // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
    fallback: "blocking",
  };
};

const id = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
      <Blog blog={props.blog} comments={props.comments}/>
      </div>
      <SocialBanner />
      
    </>
  );
};

export default id;