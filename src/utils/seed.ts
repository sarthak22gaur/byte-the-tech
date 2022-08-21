import { prisma } from "@/server/db/client";
import contentfulClient, { cfManagementClient } from "@/utils/contentful";
import { env } from "@/env/server.mjs";
import type { TypeBlogFields } from "@/types/contentful-types";
import type { TypeBlog } from "@/types/contentful-types";



export const seed = async (id: string) => {
  console.log("seed test");
  const space = await cfManagementClient.getSpace(env.CONTENTFUL_SPACE_ID)
  const environment = await space.getEnvironment('master')
  const entry = await environment.getEntry(id)
  const result = await entry.patch([
    {
        op: 'replace',
        path: '/fields/dbSeed/en-US',
        value: true
    }
  ])
  await result.publish();
// entry.fields.dbSeed = true;
// const result = await entry.update()
//   console.log(entry.fields)
  return;
};
