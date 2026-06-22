import prisma from "@/lib/prisma";
import AlumniAdminClient from "./AlumniAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminAlumniPage() {
  const alumni = await prisma.alumni.findMany({
    orderBy: { createdAt: "desc" }
  });

  return <AlumniAdminClient initialAlumni={alumni} />;
}
