import prisma from "@/lib/prisma";
import MembersClient from "./MembersClient";

export const dynamic = "force-dynamic";

export default function MembersPageWrapper() {
  const membersPromise = prisma.teamMember.findMany({
    orderBy: { createdAt: "asc" },
  });
  
  return <MembersClient membersPromise={membersPromise as any} />;
}
