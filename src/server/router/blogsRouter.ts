import { createRouter } from "./context";
import { createProtectedRouter } from "./protected-router";
import { z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";

export const blogRouter = createRouter()
  .query("getAllBlog", {
    async resolve({ ctx }) {
      return await ctx.prisma.blog.findMany({
        where: {
          published: true,
        },
        select: {
          id: true,
          title: true,
          description: true,
          author: true,
          tags: true,
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
      try{
        const result = await ctx.prisma.blog.findUnique({
          where: {
            id: input.blogId,
          },
          select: {
            author: true,
            description: true,
            title: true,
            id: true,
            tags: true,
            BlogContent: {
              select: {
                content: true,
                headerImage: true,
              },
            },
            User: {
              select: {
                name: true,
                image: true,
              }
            }
          },
        });
        if(result !== null){
          return result
        }
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Blog does not exist'
        })

      } catch(e) {
        throw e;
      }
      
    },
  });

export const blogRouterSecure = createProtectedRouter().mutation("createBlog", {
  input: z.object({
    title: z.string(),
    content: z.string(),
    headimage: z.string().url(),
    author: z.string(),
    description: z.string(),
    tags: z.string(),
  }),
  async resolve({ input, ctx }) {
    try {
      if (ctx.session?.user.role === "MEMBER") {
        return await ctx.prisma.blog.create({
          data: {
            title: input.title,
            description: input.description,
            author: input.author,
            userId: ctx.session?.user?.id,
            tags: input.tags,
            BlogContent: {
              create: [
                {
                  headerImage: input.headimage,
                  content: input.content,
                },
              ],
            },
          },
        });
      }
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You need to be a member to post a blog",
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Blog already exists",
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
