import { fetchActiveQuests } from "@/actions/dataActions";
import { verifyAdmin } from "@/actions/authActions";
import HomeClient from "./HomeClient";

export default async function Page() {
  const activeQuests = await fetchActiveQuests();
  const isAdmin = await verifyAdmin();

  return <HomeClient activeQuests={activeQuests} isAdmin={isAdmin} />;
}
