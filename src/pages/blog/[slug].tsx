// Package imports
import { useRouter } from "next/router";
import superjson from "superjson";
import { createSSGHelpers } from "@trpc/react/ssg";

// Types imports/defs
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

// Components imports
import Navbar from "@/components/Navbar";
import Seo from "@/components/SEO";
import { createContext } from "@/server/router/context";
import Blog from "@/components/blog/Blog";

// Utils imports
import { appRouter } from "@/server/router";
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

const Slug = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();

  const { slug } = props;
  const blogQuery = trpc.useQuery(["blogs.getSingleBlog", { blogSlug: slug }]);
  const { data } = blogQuery;
  if (!data) {
    return router.push("/");
  }

  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center">
        <Blog blog={data} />
      </div>
    </>
  );
};

export default Slug;
