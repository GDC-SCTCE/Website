import prisma from "@/lib/prisma";
import ToolAdminClient from "./ToolAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminTools() {
  const tools = await prisma.tool.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-sora font-extrabold text-[32px] text-[#FF7A00] mb-2">TOOLS DATABASE</h1>
        <p className="font-mono text-[14px] text-[#E0C0AF] tracking-[1.2px]">
          MANAGE DEVELOPMENT TOOLS AVAILABLE IN THE INVENTORY.
        </p>
      </div>

      <ToolAdminClient tools={tools} />
    </div>
  );
}
