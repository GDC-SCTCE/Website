import React from "react";
import prisma from "@/lib/prisma";
import InventoryClient from "./InventoryClient";
import { verifyUser, verifyAdmin } from "@/actions/authActions";

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  const [dbTools, user, isAdmin] = await Promise.all([
    prisma.tool.findMany({ orderBy: { rating: "desc" } }),
    verifyUser(),
    verifyAdmin(),
  ]);

  const initialUserTools = user?.tools || [];
  const isSignedIn = !!user;

  return <InventoryClient dbTools={dbTools} initialUserTools={initialUserTools} isSignedIn={isSignedIn} isAdmin={isAdmin} />;
}
