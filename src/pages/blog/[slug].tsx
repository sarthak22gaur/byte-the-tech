import superjson from "superjson";
import { createSSGHelpers } from "@trpc/react/ssg";
import {
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";

import { appRouter } from "@/server/router";
import Navbar from "@/components/Navbar";
import SocialBanner from "@/components/SocialBanner";
import Seo from "@/components/SEO";
import { createContext } from "@/server/router/context";

import Blog from "@/components/blog/Blog";
import { trpc } from "@/utils/trpc";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext<{ slug: string }>
// ) => {
//   const ssg = createSSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//     transformer: superjson,
//   });

//   const slug = context.params?.slug as string;
//   await ssg.prefetchQuery("blogs.getSingleBlog", {
//     blogSlug: slug,
//   });

//   // TODO: error handler

//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       slug,
//     },
//   };
// };

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string }>
) => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  const slug = context.params?.slug as string;
  const blog = await ssg.fetchQuery("blogs.getSingleBlog", { blogSlug: slug });

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

  const allBlogs = await ssg.fetchQuery("blogs.getAllBlogs");

  // FIXME: Fix the URL to show title instead of slug ID
  return {
    paths: allBlogs.items.map((blog) => ({
      params: {
        slug: blog.fields.title.trim().toLowerCase().replace(/[ ,]+/g, "-"),
      },
    })),
    // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
    fallback: false,
  };
};

const slug = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  // const { slug } = props;
  // const blogQuery = trpc.useQuery(["blogs.getSingleBlog", { blogSlug: slug }]);
  // const { data } = blogQuery;
  // if (!data) {
  //   return <div>404</div>;
  // }

  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center">
        <Blog blog={props.blog} />
      </div>

      {/* <footer>
        <SocialBanner />
      </footer> */}
    </>
  );
};

export default slug;
