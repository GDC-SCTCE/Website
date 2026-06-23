import { fetchActiveQuests } from "@/actions/dataActions";
import HomeClient from "./HomeClient";

export default function Page() {
  const activeQuestsPromise = fetchActiveQuests();

  return <HomeClient activeQuestsPromise={activeQuestsPromise} />;
}
