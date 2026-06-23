import prisma from "@/lib/prisma";
import { ArcadeClient } from "./ArcadeClient";

export const dynamic = "force-dynamic";

export default function ArcadePage() {
  const gamesPromise = prisma.game.findMany({
    orderBy: { createdAt: "desc" }
  });

  return <ArcadeClient gamesPromise={gamesPromise} />;
}
