import * as contentful from 'contentful'

import { env } from '@/env/server.mjs'

const contentfulClient = contentful.createClient({
  space: env.CONTENTFUL_SPACE_ID,
  environment: env.CONTENTFUL_ENVIRONMENT,
  accessToken: env.CONTENTFUL_DELIVERY_API_KEY,
})

export default contentfulClient
