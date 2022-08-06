import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "@/components/Navbar";

import { createContext } from "@/server/router/context";

import { appRouter } from "@/server/router";
import superjson from "superjson";
import { createSSGHelpers } from "@trpc/react/ssg";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";

import {BlogCard} from "@/components/BlogGrid";


export const getStaticProps = async (context: GetStaticPropsContext<{ id: string, title: string }>) => {
    const ssg = createSSGHelpers({
      router: appRouter,
      ctx: await createContext(),
      transformer: superjson,
    });
  
    const id = context.params?.id as string;
    console.log(context);
    const blog = await ssg.fetchQuery('blogs.getSingleBlog', {blogId: id});
  
    return {
      props: {
        trpcState: ssg.dehydrate(),
        blog
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
    
     
      const allBlogs = await ssg.fetchQuery('blogs.getAllBlog');
    
  
    return {
      paths: allBlogs.map((blog) => ({
        params: {
            id: blog.id,
          title: String(blog.title.split(" ").join("-").toLowerCase()),
        },
      })),
      // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
      fallback: 'blocking',
    };
  };

const id = (props: InferGetStaticPropsType<typeof getStaticProps>) => {

    console.log(props.blog)
    return (
      <div className="px-6 py-6 md:px-10 md:w-1/3 flex flex-col items-start bg-blue-800">      
        {props.blog?.description}
      </div>
    );
  };
  
  export default id;