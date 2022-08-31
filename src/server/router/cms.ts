import { z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";

import { createRouter } from "./context";
import contentfulClient from "@/utils/contentful";
import type { TypeBlogFields } from "@/types/contentful-types";
import { env } from "@/env/server.mjs";

export const cmsRouter = createRouter().query("updateBlogEntryInDb", {
  async resolve({ input, ctx }) {
    try {
      console.log("Secret");

      const secret = ctx.req?.headers["cms-hook-api-secret"];
      if (secret !== env.CMS_HOOK_API_SECRET) {
      }

      const newTitle = ctx.req?.body.fields.title;
      const blogId = ctx.req?.body.sys.id;
      const slug = newTitle.trim().toLowerCase().replace(/[ ,]+/g, "-");

      console.log("Secret", secret);

      const blogFromDb = await ctx.prisma.blog.findUniqueOrThrow({
        where: {
          contentfulBlogId: blogId,
        },
      });

      if (blogFromDb.blogSlug === slug) {
      }

      const result = await ctx.prisma.blog.update({
        where: {
          contentfulBlogId: blogId,
        },
        data: {
          blogSlug: slug,
        },
      });

      return {
        message: 'Update Succesful',
      };
  
      
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw e;
      }
      if (e instanceof TRPCError) {
        throw e;
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  },
});
