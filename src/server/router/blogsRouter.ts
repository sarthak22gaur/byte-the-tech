import { createRouter } from "./context";
import { z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";
import { prisma } from "../db/client";

export const blogRouter = createRouter()
  .query("getAllBlog", {
    async resolve({ ctx }) {
      return await ctx.prisma.blog.findMany({
        select: {
          title: true,
          description: true,
          author: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
  })
  .query("getSingleBlog", {
    input: z.object({
      blogId: z.string(),
    }),

    async resolve({ input, ctx }) {
      return await ctx.prisma.blog.findUnique({
        where: {
          id: input.blogId,
        },
      });
    },
  })
  .mutation("createBlog", {
    input: z.object({
      title: z.string(),
      content: z.string(),
      headimage: z.string().url(),
      author: z.string(),
      description: z.string(),
    }),
    async resolve({ input, ctx }) {
      try {
        return await ctx.prisma.blog.create({
          data: {
            title: input.title,
            description: input.description,
            author: input.author,
            userId: ctx.session?.user?.id,
            BlogContent: {
              create: [
                {
                  headerImage: input.headimage,
                  content: input.content,
                },
              ],
            },
            // userId: ctx.session.user.id,
          },
        });
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new TRPCError({
              code: "CONFLICT",
              message: "Blog already exists",
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    },
  });
