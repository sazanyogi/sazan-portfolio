import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js requires unsafe-inline for hydration scripts; dev mode also needs unsafe-eval for HMR/stack traces (React never uses eval in production)
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      // Inline styles are used extensively via React style props
      "style-src 'self' 'unsafe-inline'",
      // next/font/google self-hosts fonts — no external font origin needed
      "font-src 'self'",
      "img-src 'self' data: blob: https://upload.wikimedia.org https://m.media-amazon.com https://image.tmdb.org https://www.coreequipment.com https://cdn.shopify.com https://www.kinzd.com",
      "frame-src https://calendar.google.com https://www.youtube.com",
      "connect-src 'self' https://en.wikipedia.org",
      "media-src 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.coreequipment.com" },
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "www.kinzd.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "image.tmdb.org" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
