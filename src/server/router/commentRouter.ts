import { createRouter } from "./context";
import { z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";

export const commentRouter = createRouter()
  .query("getCommentsOnPost", {
    input: z.object({
      blogId: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.comment.findMany({
        where: {
          blogId: input.blogId,
        },
        select: {
          message: true,
          createdBy: true,
          User: {
            select: {
              name: true,
              image: true,
            },
          },
          blogId: true,
        },
      });
    },
  })
  .mutation("createCommentOnPost", {
    input: z.object({
      message: z.string(),
      blogId: z.string(),
      userId: z.string(),
      userName: z.string(),
    }),
    async resolve({ input, ctx }) {
      try {
        if (ctx.session) {
          return await ctx.prisma.comment.create({
            data: {
              message: input.message,
              blogId: input.blogId,
              createdBy: input.userName,
              userId: ctx.session?.user?.id
                ? ctx.session.user.id
                : input.userId,
            },
          });
        }
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You need to be logged in to post a comment",
        });
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new TRPCError({
              code: "CONFLICT",
              message: "Comment already exists",
            });
          }
        } else if (e instanceof TRPCError) {
          throw e;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    },
  });
