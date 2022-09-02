import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";

// Utils imports
import { prisma } from "@/server/db/client";

export const seed = async (id: string, slug: string) => {
  try {
    return await prisma.blog.create({
      data: {
        contentfulBlogId: id,
        blogSlug: slug.trim().toLowerCase().replace(/[ ,]+/g, "-"),
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Blog already seeded",
        });
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }
};

export const update = async (id: string, slug: string) => {
  try {
    return await prisma.blog.update({
      where: {
        contentfulBlogId: id,
      },
      data: {
        blogSlug: slug,
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Blog already seeded",
        });
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }
};
