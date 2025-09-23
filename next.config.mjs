/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: [
    //   { protocol: "https", hostname: "placehold.jp" },
    //   { protocol: "https", hostname: "images.microcms-assets.io" },
    // ],

    domains: [
      process.env.NEXT_PUBLIC_SUPABASE_DOMAIN, // Supabase Storage画像の表示許可
    ],
  },
};

export default nextConfig;
