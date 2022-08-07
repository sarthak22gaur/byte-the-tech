// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { blogRouter } from "./blogsRouter";
import { protectedExampleRouter } from "./protected-example-router";
import {commentRouter} from '@/server/router/commentRouter'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("blogs.", blogRouter)
  .merge("question.", protectedExampleRouter)
  .merge('comment.', commentRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
