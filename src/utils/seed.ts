import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";

import { prisma } from "@/server/db/client";
import contentfulClient, { cfManagementClient } from "@/utils/contentful";
import { env } from "@/env/server.mjs";

import type { TypeBlogFields } from "@/types/contentful-types";

export const seed = async (id: string, slug: string) => {
  try {
    await prisma.blog.create({
      data: {
        contentfulBlogId: id,
        blogSlug: slug.trim().toLowerCase().replace(/[ ,]+/g, "-"),
      },
    });
    
    return;
  } catch (e) {
    console.table(e);
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
