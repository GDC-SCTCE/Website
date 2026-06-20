import React from "react";
import prisma from "@/lib/prisma";
import InventoryClient from "./InventoryClient";
import { verifyUser } from "@/actions/authActions";

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  const [dbTools, user] = await Promise.all([
    prisma.tool.findMany({ orderBy: { rating: "desc" } }),
    verifyUser(),
  ]);

  const initialUserTools = user?.tools || [];
  const isSignedIn = !!user;

  return <InventoryClient dbTools={dbTools} initialUserTools={initialUserTools} isSignedIn={isSignedIn} />;
}
