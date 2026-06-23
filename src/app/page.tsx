import { fetchActiveQuests } from "@/actions/dataActions";
import { verifyAdmin } from "@/actions/authActions";
import HomeClient from "./HomeClient";

export default function Page() {
  const activeQuestsPromise = fetchActiveQuests();
  const isAdminPromise = verifyAdmin();

  return <HomeClient activeQuestsPromise={activeQuestsPromise} isAdminPromise={isAdminPromise} />;
}
