import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

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

import { BlogCard } from "@/components/BlogGrid";

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
const blogCont = await serialize(blog?.BlogContent[0]?.content ? blog?.BlogContent[0]?.content : 'Not available')
  return {
    props: {
      trpcState: ssg.dehydrate(),
      blog,
      blogCont
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
  console.log(props.blog);
  return (
    <>
      <Navbar />
      <div className="flex justify-center dark:bg-[rgb(15,23,42)]">
        <div className="flex flex-col justify-center items-center max-w-prose">
          <div className="relative w-full h-80">
            <Image
              layout="fill"
              src={
                props.blog?.BlogContent[0]?.headerImage
                  ? props.blog?.BlogContent[0]?.headerImage
                  : "https://storage.googleapis.com/cp_bucket_test/8KKpE4bnrgPr_BSjdodjBBS01657346517231.png"
              }
              alt="Main image"
            />
          </div>
          <div>{props.blog?.title}</div>
          <div>{props.blog?.description}</div>
          <div className="prose text-justify dark:text-white">
            {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {props.blog?.BlogContent[0]?.content
                ? props.blog?.BlogContent[0]?.content
                : "Not available"}
            </ReactMarkdown> */}
            <MDXRemote {...props.blogCont}/>
          </div>
          <div>{props.blog?.BlogContent[0]?.comments[0]?.message}</div>
        </div>
      </div>
    </>
  );
};

export default id;
