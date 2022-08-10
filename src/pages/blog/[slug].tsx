import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import SocialBanner from "@/components/SocialBanner";

import Seo from '@/components/SEO'

import { createContext } from "@/server/router/context";
import { BlogInfoCard } from "@/components/BlogInfo";

import { appRouter } from "@/server/router";
import superjson from "superjson";
import { createSSGHelpers } from "@trpc/react/ssg";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { NextSeo } from 'next-seo';
import Blog from "@/components/BlogContent";

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string }>
) => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  const slug = context.params?.slug as string;
  const blog = await ssg.fetchQuery("blogs.getSingleBlog", { blogId: slug });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      blog,
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
      },
    })),
    // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
    fallback: false,
  };
};

const slug = (props: InferGetStaticPropsType<typeof getStaticProps>) => {

  return (
    <>
    

      <nav>
        <Navbar />
      </nav>
      <main className="h-full">
        <div className="flex justify-center lg:justify-start">
          <Blog blog={props.blog} />
          <div className="hidden lg:block">
            <BlogInfoCard blog={props.blog} />
          </div>
        </div>
      </main>
      <footer>
        <SocialBanner />
      </footer>
    </>
  );
};

export default slug;
