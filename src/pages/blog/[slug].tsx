import superjson from "superjson";
import { createSSGHelpers } from "@trpc/react/ssg";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { appRouter } from "@/server/router";
import Navbar from "@/components/Navbar";
import SocialBanner from "@/components/SocialBanner";
import Seo from "@/components/SEO";
import { createContext } from "@/server/router/context";
import { BlogInfoCard } from "@/components/blog/BlogInfo";
import Blog from "@/components/blog/BlogContent";
import { trpc } from "@/utils/trpc";

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ slug: string }>
) => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  const slug = context.params?.slug as string;
  await ssg.prefetchQuery("blogs.getSingleBlog", {
    blogSlug: slug,
  });

  // TODO: error handler

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
  };
};

const slug = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { slug } = props;
  const blogQuery = trpc.useQuery(["blogs.getSingleBlog", { blogSlug: slug }]);
  const { data } = blogQuery;
  if (!data) {
    return <div>404</div>;
  }

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main className="h-full">
        <div className="flex justify-center lg:justify-start">
          <Blog blog={data} />
          <div className="hidden lg:block">
            <BlogInfoCard blog={data} />
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
