// Package Imports
import Head from "next/head";

// TODO: move constants to env
const DOMAIN = "https://btt.skgr.xyz";
const DEFAULT_SITENAME = "Byte The Tech";
const DEFAULT_TITLE = "Byte The Tech";
const DEFAULT_DESCRIPTION = "This is the default description";
const DEFAULT_OG_TYPE = "website";
const DEFAULT_TWITTER_HANDLE = "@sarthakgaur22";
const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/cp_bucket_test/8KKpE4bnrgPr_BSjdodjBBS01657346517231.png";

export const SEO: React.FC<{
  title?: string;
  description?: string;
  // siteName?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterHandle?: string;
}> = (props) => {
  const title = props.title ? props.title : DEFAULT_TITLE;
  const description = props.description ? props.description : DEFAULT_DESCRIPTION;
  const siteName = DEFAULT_SITENAME;
  const canonical = props.canonical ? props.canonical : DOMAIN;
  const ogImage = props.ogImage ? props.ogImage : DEFAULT_OG_IMAGE;
  const ogType = props.ogType ? props.ogType : DEFAULT_OG_TYPE;
  const twitterHandle = props.twitterHandle
    ? props.twitterHandle
    : DEFAULT_TWITTER_HANDLE;

  return (
    <Head>
      <title key="title">{`${title} – ${siteName}`}</title>
      <meta name="description" content={description} />
      <meta key="og_type" property="og:type" content={ogType} />
      <meta key="og_title" property="og:title" content={title} />
      <meta
        key="og_description"
        property="og:description"
        content={description}
      />
      <meta key="og_locale" property="og:locale" content="en_IE" />
      <meta key="og_site_name" property="og:site_name" content={siteName} />
      <meta key="og_url" property="og:url" content={canonical} />
      <meta key="og_site_name" property="og:site_name" content={siteName} />
      <meta key="og_image" property="og:image" content={ogImage} />
      <meta
        key="og_image:alt"
        property="og:image:alt"
        content={`${title} | ${siteName}`}
      />
      <meta key="og_image:width" property="og:image:width" content="1200" />
      <meta key="og_image:height" property="og:image:height" content="630" />

      <meta name="robots" content="index,follow" />

      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta key="twitter:site" name="twitter:site" content={twitterHandle} />
      <meta
        key="twitter:creator"
        name="twitter:creator"
        content={twitterHandle}
      />
      <meta key="twitter:title" property="twitter:title" content={title} />
      <meta
        key="twitter:description"
        property="twitter:description"
        content={description}
      />

      <link rel="canonical" href={canonical} />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
};

export default SEO;
