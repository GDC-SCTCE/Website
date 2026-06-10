import prisma from "@/lib/prisma";
import MembersClient from "./MembersClient";

export const dynamic = "force-dynamic";

export default async function MembersPageWrapper() {
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { createdAt: "asc" },
  });
  
  return <MembersClient initialMembers={teamMembers as any[]} />;
}
