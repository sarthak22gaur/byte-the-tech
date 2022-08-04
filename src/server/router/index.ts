// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { blogRouter } from "./blogsRouter";
import { protectedExampleRouter } from "./protected-example-router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("blogs.", blogRouter)
  .merge("question.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
