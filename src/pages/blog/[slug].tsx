import superjson from "superjson";
import { createSSGHelpers } from "@trpc/react/ssg";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";

import { appRouter } from "@/server/router";
import Navbar from "@/components/Navbar";
import SocialBanner from "@/components/SocialBanner";
import Seo from "@/components/SEO";
import { createContext } from "@/server/router/context";
import { BlogInfoCard } from "@/components/blog/BlogInfo";
import Blog from "@/components/blog/BlogContent";

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string }>
) => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  const slug = context.params?.slug as string;
  const blog = await ssg.fetchQuery("blogs.getSingleBlog", {
    blogSlug: slug,
  });

  // TODO: error handler
  if(!blog) {
    throw new Error('')
  }
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

// TODO: Add better error messages
    const allBlogs = await ssg.fetchQuery("blogs.getAllBlogs");  
    if(!allBlogs) {
      throw new Error('')
    }

  
  return {
    paths: allBlogs.items.map((blog) => ({
      params: {
        slug: blog.fields.title.trim().toLowerCase().replace(/[ ,]+/g, "-")
      },
    })),
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
