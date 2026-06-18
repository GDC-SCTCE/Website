import { fetchActiveQuests } from "@/actions/dataActions";
import HomeClient from "./HomeClient";

export default async function Page() {
  const activeQuests = await fetchActiveQuests();

  return <HomeClient activeQuests={activeQuests} />;
}
