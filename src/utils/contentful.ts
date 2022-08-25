import * as contentful from 'contentful'
import * as contentful_management from 'contentful-management'
import { env } from "@/env/server.mjs";

const contentfulClient = contentful.createClient({
    space: env.CONTENTFUL_SPACE_ID,
    accessToken: env.CONTENTFUL_DELIVERY_API_KEY,
})

export const cfManagementClient = contentful_management.createClient({
    accessToken: env.CONTENTFUL_PERSONAL_ACCESS_TOKEN
  })

export default contentfulClient;
