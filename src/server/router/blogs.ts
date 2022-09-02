// Package imports
import { z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";

// Utils imports
import { createRouter } from "@/server/router/context";
import contentfulClient from "@/utils/contentful";
import { seed, update } from "@/utils/db";
// import { update } from "@/utils/update";

// Types imports/defs
import type { TypeBlogFields } from "@/types/contentful-types";

export const blogRouter = createRouter()
  .query("getAllBlogs", {
    async resolve({ input, ctx }) {
      try {
        const entries = await contentfulClient.getEntries<TypeBlogFields>({
          content_type: "blog",
          select:
            "fields.heroImage,fields.title,fields.blogTags,fields.blogDescription,fields.blogAuthor,fields.dbSeed,fields.slug",
        });

        entries.items.map(async (curr) => {
          const blogFromDB = await ctx.prisma.blog.findUnique({
            where: {
              contentfulBlogId: curr.sys.id,
            },
          });

          const slug = curr.fields.title
            .trim()
            .toLowerCase()
            .replace(/[ ,]+/g, "-");

          // TODO: add error handling for seed and update

          if (!blogFromDB) {
            await seed(curr.sys.id, curr.fields.title);
          } else if (blogFromDB?.blogSlug !== slug) {
            await update(curr.sys.id, slug);
          }
        });
        return entries;
      } catch (e) {
        if (e instanceof TRPCError) {
          throw e;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    },
  })
  .query("getSingleBlog", {
    input: z.object({
      blogSlug: z.string(),
    }),
    async resolve({ input, ctx }) {
      try {
        const blogFromDB = await ctx.prisma.blog.findUnique({
          where: {
            blogSlug: input.blogSlug,
          },
        });
        const blogId = blogFromDB?.contentfulBlogId as string;

        const contenfulData = await contentfulClient.getEntry<TypeBlogFields>(
          blogId,
          {
            content_type: "blog",
            select:
              "sys.createdAt,fields.heroImage,fields.title,fields.blogTags,fields.blogDescription,fields.blogAuthor,fields.blogContent,fields.slug",
          }
        );
        return contenfulData;
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

// export const blogRouterSecure = createProtectedRouter().mutation("createBlog", {
//   input: z.object({
//     title: z.string(),
//     content: z.string(),
//     headimage: z.string().url(),
//     author: z.string(),
//     description: z.string(),
//     tags: z.string(),
//   }),
//   async resolve({ input, ctx }) {
//     try {
//       if (ctx.session?.user.role === "MEMBER") {
//         return await ctx.prisma.blog.create({
//           data: {
//             title: input.title,
//             description: input.description,
//             author: input.author,
//             userId: ctx.session?.user?.id,
//             tags: input.tags,
//             BlogContent: {
//               create: [
//                 {
//                   headerImage: input.headimage,
//                   content: input.content,
//                 },
//               ],
//             },
//           },
//         });
//       }
//       throw new TRPCError({
//         code: "UNAUTHORIZED",
//         message: "You need to be a member to post a blog",
//       });
//     } catch (e) {
//       if (e instanceof PrismaClientKnownRequestError) {
//         if (e.code === "P2002") {
//           throw new TRPCError({
//             code: "CONFLICT",
//             message: "Blog already exists",
//           });
//         }
//       } else if (e instanceof TRPCError) {
//         throw e;
//       }
//       throw new TRPCError({
//         code: "INTERNAL_SERVER_ERROR",
//         message: "Something went wrong",
//       });
//     }
//   },
// });
