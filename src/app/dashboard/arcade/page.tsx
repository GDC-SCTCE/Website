import prisma from "@/lib/prisma";
import { ArcadeClient } from "./ArcadeClient";

export const dynamic = "force-dynamic";

export default async function ArcadePage() {
  const games = await prisma.game.findMany({
    orderBy: { createdAt: "desc" }
  });

  return <ArcadeClient games={games} />;
}
