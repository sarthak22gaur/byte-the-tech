import { env } from "./src/env/server.mjs";
import withBundleAnalyzer from "@next/bundle-analyzer";

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}
const BundleAnalyzer = withBundleAnalyzer({
  enabled: env.ANALYZE_BUNDLE === "true",
});

let nextConfig = defineNextConfig({
  images: {
    domains: [
      "storage.googleapis.com",
      "lh3.googleusercontent.com",
      "images.ctfassets.net",
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
});

if (env.ANALYZE_BUNDLE === "true") {
  nextConfig = BundleAnalyzer(nextConfig);
}

export default nextConfig;
