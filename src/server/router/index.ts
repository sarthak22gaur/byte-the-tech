// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { blogRouter } from "@/server/router/blogs";
import {commentRouter, commentRouterSecure} from '@/server/router/comments'
import { cmsRouter } from "@/server/router/cms";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("blogs.", blogRouter)
  .merge('comment.', commentRouter)
  .merge('cms.', cmsRouter)
  .merge('commentSecure.', commentRouterSecure)


// export type definition of API
export type AppRouter = typeof appRouter;
