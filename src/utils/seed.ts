import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";

import { prisma } from "@/server/db/client";
import contentfulClient, { cfManagementClient } from "@/utils/contentful";
import { env } from "@/env/server.mjs";

import type { TypeBlogFields } from "@/types/contentful-types";

export const seed = async (id: string) => {
  try {
    const space = await cfManagementClient.getSpace(env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master');
    const entry = await environment.getEntry(id);
    const slug = entry.fields.title["en-US"];
    const result = await entry.patch([
      {
        op: "replace",
        path: "/fields/dbSeed/en-US",
        value: true,
      },
    ]);
    await result.publish();

    // const entry = await contentfulClient.getEntry<TypeBlogFields>(
    //   id,
    //   {
    //     content_type: "blog",
    //     select:
    //       "sys.id,fields.heroImage,fields.title,fields.blogTags,fields.blogDescription,fields.blogAuthor,fields.blogContent,fields.slug",
    //   }
    // );
    // const slug = entry.fields.title;

    await prisma.blog.create({
      data: {
        contentfulBlogId: entry.sys.id,
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
