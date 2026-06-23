import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gdcsctce.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/", // Keep administrative paths private
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
