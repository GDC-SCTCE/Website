import { fetchDashboardData } from "@/actions/dataActions";
import { QuestBoardClient } from "./components/QuestBoardClient";

export const dynamic = "force-dynamic";

export default function QuestBoardPage() {
  // Start the fetch but do NOT await it! This allows the page layout to render instantly.
  const dashboardDataPromise = fetchDashboardData();

  return (
    <QuestBoardClient dashboardDataPromise={dashboardDataPromise} />
  );
}
