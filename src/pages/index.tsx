// Package imports
import { createSSGHelpers } from '@trpc/react/ssg'
import superjson from 'superjson'

// Types imports/defs
import { InferGetServerSidePropsType } from 'next'

// Components imports
import Navbar from '@/components/Navbar'
import HomeHeader from '@/components/home/HomeHeader'
import HomeContent from '@/components/home/HomeContent'
import SEO from '@/components/SEO'

// Utils imports
import { createContext } from '@/server/router/context'
import { appRouter } from '@/server/router'

import { trpc } from '@/utils/trpc'

export const getServerSideProps = async () => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  })

  await ssg.prefetchQuery('blogs.getAllBlogs')

  // TODO: error handler
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  }
}

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const allBlogs = trpc.useQuery(['blogs.getAllBlogs'])
  if (!allBlogs.data) {
    return <div>Loading..</div>
  }
  
  return (
    <>
      <SEO />
      <Navbar />
      <HomeHeader />
      <HomeContent allBlogs={allBlogs.data} />
    </>
  )
}

export default Home
