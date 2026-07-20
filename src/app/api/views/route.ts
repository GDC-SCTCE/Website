// app/api/views/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://abacus.jasoncameron.dev/hit/gdc-sctce/visits", {
      cache: "no-store", 
    });
    
    if (!response.ok) throw new Error("Database fetch failed");
    
    const data = await response.json();
    const views = data.value;

    // Format the number compactly right here before sending it to the client
    const formattedViews = views > 999 
      ? `${(views / 1000).toFixed(1)}K+` 
      : `${views}+`;

    return NextResponse.json({ views: formattedViews });
  } catch (error) {
    // Graceful server fallback if the API endpoint experiences lag
    return NextResponse.json({ views: "1.2K+" });
  }
}