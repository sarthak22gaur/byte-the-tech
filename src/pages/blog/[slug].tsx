import superjson from "superjson";
import { createSSGHelpers } from "@trpc/react/ssg";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { appRouter } from "@/server/router";
import Navbar from "@/components/Navbar";
import Seo from "@/components/SEO";
import { createContext } from "@/server/router/context";
import Blog from "@/components/blog/Blog";
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
      <Navbar />
      <div className="w-full flex flex-col items-center">
        <Blog blog={data} />
      </div>

      {/* <footer>
        <SocialBanner />
      </footer> */}
    </>
  );
};

export default slug;
