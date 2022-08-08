// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { blogRouter, blogRouterSecure } from "./blogsRouter";
import { protectedExampleRouter } from "./protected-example-router";
import {commentRouter, commentRouterSecure} from '@/server/router/commentRouter'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("blogs.", blogRouter)
  .merge('comment.', commentRouter)
  .merge('commentSecure.', commentRouterSecure)
  .merge('blogsSecure.', blogRouterSecure)

// export type definition of API
export type AppRouter = typeof appRouter;
