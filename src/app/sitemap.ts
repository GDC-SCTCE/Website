import { MetadataRoute } from "next";

export const revalidate = 3600; // revalidate sitemap cache at most every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gdcsctce.vercel.app";

  const routes = [
    "",
    "/dashboard/quests",
    "/dashboard/arcade",
    "/dashboard/members",
    "/dashboard/leaderboard",
    "/dashboard/inventory",
    "/dashboard/profile",
    "/terms",
    "/onboarding",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/dashboard") ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/dashboard") ? 0.8 : 0.5,
  }));
}
