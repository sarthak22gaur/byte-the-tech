// Package imports
import superjson from "superjson";

// Utils imports
import { createRouter } from "@/server/router/context";

// Router imports
import { blogRouter } from "@/server/router/blogs";
import {commentRouter, commentRouterSecure} from '@/server/router/comments'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("blogs.", blogRouter)
  .merge('comment.', commentRouter)
  .merge('commentSecure.', commentRouterSecure)


// export type definition of API
export type AppRouter = typeof appRouter;
