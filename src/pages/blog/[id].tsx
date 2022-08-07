import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
  context: GetStaticPropsContext<{ id: string; title: string }>
) => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  const id = context.params?.id as string;
  console.log(context);
  const blog = await ssg.fetchQuery("blogs.getSingleBlog", { blogId: id });
  // const blogCont = await serialize(blog?.BlogContent[0]?.content ? blog?.BlogContent[0]?.content : 'Not available')
  return {
    props: {
      trpcState: ssg.dehydrate(),
      blog,
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
        id: blog.id,
        title: String(blog.title.split(" ").join("-").toLowerCase()),
      },
    })),
    // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
    fallback: "blocking",
  };
};

const id = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
//   console.log(props.blog);
  return (
    <>
      <Navbar />
      <Blog blog={props.blog}/>
    </>
  );
};

export default id;
