import React from "react";
import { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service | Ignition Collective",
  description: "Terms and conditions for participating in the SCTCE Game Dev Club (GDC) quests, arcade, and community.",
};

export default function TermsPage() {
  return <TermsClient />;
}
