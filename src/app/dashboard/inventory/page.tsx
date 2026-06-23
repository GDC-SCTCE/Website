import prisma from "@/lib/prisma";
import InventoryClient from "./InventoryClient";
import { verifyUser, verifyAdmin } from "@/actions/authActions";

export const dynamic = "force-dynamic";

export default function InventoryPage() {
  const inventoryDataPromise = Promise.all([
    prisma.tool.findMany({ orderBy: { rating: "desc" } }),
    verifyUser(),
    verifyAdmin(),
  ]).then(([dbTools, user, isAdmin]) => ({
    dbTools,
    initialUserTools: user?.tools || [],
    isSignedIn: !!user,
    isAdmin,
  }));

  return <InventoryClient inventoryDataPromise={inventoryDataPromise} />;
}
