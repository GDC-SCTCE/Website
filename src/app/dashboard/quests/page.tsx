import React from "react";
import { fetchDashboardData } from "@/actions/dataActions";
import { QuestBoardClient } from "./components/QuestBoardClient";

export default async function QuestBoardPage() {
  const { quests, isAdmin, user } = await fetchDashboardData();

  return (
    <QuestBoardClient
      initialQuests={quests}
      isAdmin={isAdmin}
      user={user}
    />
  );
}
