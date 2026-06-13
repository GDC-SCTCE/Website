export const NAV_LINKS = [
  { label: "Quest Board", href: "/dashboard/quests" },
  { label: "Arcade Wall", href: "/dashboard/arcade" },
  { label: "Character Select", href: "/dashboard/members" },
  { label: "Hall Of Fame", href: "/dashboard/leaderboard" },
  { label: "Inventory", href: "/dashboard/inventory" },
] as const;

export const ADMIN_NAV_LINKS = [
  { label: "Overview", href: "/admin" },
  { label: "Quests", href: "/admin/quests" },
  { label: "Registrations", href: "/admin/registrations" },
  { label: "Games", href: "/admin/games" },
  { label: "Team Members", href: "/admin/team" },
] as const;
