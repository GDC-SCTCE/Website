export const DEV_TOOLS = ["Unity", "Godot", "Unreal", "Blender", "Figma"];
export const YEAR_OPTIONS = ["1st", "2nd", "3rd", "4th"];

export const XP_LEVELS = [
  {
    id: "Newbie" as const,
    label: "Newbie",
    desc: "Fresh onto the grid. Ready to learn the fundamentals of the hub.",
  },
  {
    id: "Apprentice" as const,
    label: "Apprentice",
    desc: "Active contributor with basic project deployment experience.",
  },
  {
    id: "Veteran" as const,
    label: "Veteran",
    desc: "Elite architect of the Ignition ecosystem. Multi-project leads.",
  },
] as const;
