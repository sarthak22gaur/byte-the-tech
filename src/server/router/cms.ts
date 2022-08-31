import { z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";

import { createRouter } from "./context";
import contentfulClient from "@/utils/contentful";
import type { TypeBlogFields } from "@/types/contentful-types";
import { env } from "@/env/server.mjs";

export const cmsRouter = createRouter().mutation("updateBlogEntryInDb", {
  async resolve({ input, ctx }) {
    try {
      const secret = await ctx.req?.headers["cms-hook-api-secret"];
      console.log("Secret", secret);
      // if (secret !== env.CMS_HOOK_API_SECRET) {
      //   console.log('Inside if')
      //   throw new TRPCError({
      //     code: 'UNAUTHORIZED',
      //     message: "Something went wrong",
      //   });
      // }
      console.log("Req body", ctx.req?.body.fields.title['en-US']);

      const newTitle = await ctx.req?.body.fields.title['en-US'];
      const blogId = await ctx.req?.body.sys.id;
      const slug = await newTitle.trim().toLowerCase().replace(/[ ,]+/g, "-");

      console.log("Secret", secret);

      const blogFromDb = await ctx.prisma.blog.findUniqueOrThrow({
        where: {
          contentfulBlogId: blogId,
        },
      });

      console.log(blogFromDb);

      if (blogFromDb.blogSlug === slug) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: "Blog already exists",
        });
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
