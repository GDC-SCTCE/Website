import { Quest, Game, TeamMember, LeaderboardEntry } from "../types";

export const MOCK_QUESTS: Quest[] = [
  {
    id: "q1",
    title: "Initialize System",
    description: "Install Unity, Unreal Engine, or Godot and create a blank project template.",
    category: "General",
    difficulty: "Beginner",
    xpReward: 100,
    badgeAwarded: "Protocol Initiated",
    objective: "Create a blank game project and take a screenshot of the editor."
  },
  {
    id: "q2",
    title: "C# Scripting Basics",
    description: "Write a character movement script handling inputs for horizontal and vertical axis.",
    category: "Code",
    difficulty: "Beginner",
    xpReward: 150,
    badgeAwarded: "Code Cadet",
    objective: "Implement basic character translation using engine input mappings."
  },
  {
    id: "q3",
    title: "Cyberpunk Sprite Sheet",
    description: "Draw a 4-frame walk cycle sprite sheet for a cyberpunk character (32x32 px).",
    category: "Design",
    difficulty: "Intermediate",
    xpReward: 250,
    badgeAwarded: "Pixel Pioneer",
    objective: "Create and export an animated spritesheet with transparent background."
  },
  {
    id: "q4",
    title: "Synthesize Laser FX",
    description: "Create an 8-bit laser firing sound effect using synthesizer software (e.g. sfxr or Audacity).",
    category: "Sound",
    difficulty: "Beginner",
    xpReward: 120,
    badgeAwarded: "Frequency Wave",
    objective: "Generate a custom sound effect wav/ogg and import it into your assets folder."
  },
  {
    id: "q5",
    title: "A* Pathfinding Node",
    description: "Program a grid-based A* pathfinding system for enemy AI to hunt the player.",
    category: "Code",
    difficulty: "Legendary",
    xpReward: 500,
    badgeAwarded: "Pathfinder Master",
    objective: "Calculate paths dynamically around walls without performance stutters."
  },
  {
    id: "q6",
    title: "3D Level Blockout",
    description: "Design a grey-box layout of a competitive multiplayer arena map emphasizing verticality.",
    category: "Design",
    difficulty: "Intermediate",
    xpReward: 300,
    badgeAwarded: "Architect Prime",
    objective: "Create an engaging greybox geometry with cover points and weapon spawns."
  },
  {
    id: "q7",
    title: "Dynamic Ambient Mix",
    description: "Compose a looping synthwave background track (at least 60 seconds) with an intro and outro.",
    category: "Sound",
    difficulty: "Legendary",
    xpReward: 450,
    badgeAwarded: "Audio Overlord",
    objective: "Render a high quality audio file looping seamlessly at 120 BPM."
  }
];

export const MOCK_GAMES: Game[] = [
  {
    id: "g1",
    title: "Neon Drift",
    description: "Slide through synthwave grids avoiding firewalls and scanning lasers in this neon arcade runner.",
    genre: "Arcade / Racing",
    developer: "Abhirag R Nair & Johan Gejo",
    rating: 4.8,
    coverUrl: "/images/covers/neon-drift.jpg",
    releaseYear: "2025",
    features: ["Fast-paced driving mechanics", "Synthwave dynamic soundtrack", "Local leaderboard integration"],
    playable: true,
    highScores: [
      { player: "Jaxen", score: 9840, date: "2026-06-08" },
      { player: "AlenDev", score: 9420, date: "2026-06-07" },
      { player: "CyberGhost", score: 8750, date: "2026-06-05" }
    ]
  },
  {
    id: "g2",
    title: "Hollow Maze",
    description: "A dark rogue-lite puzzle explorer where your flashlight is your only defense against creeping glitches.",
    genre: "Puzzle / Horror",
    developer: "Aleena Thomas & Nidhim Nair",
    rating: 4.5,
    coverUrl: "/images/covers/hollow-maze.jpg",
    releaseYear: "2025",
    features: ["Dynamic lighting puzzles", "Procedurally generated mazes", "Atmospheric spatial audio"],
    playable: true,
    highScores: [
      { player: "AleenaT", score: 96.8, date: "2026-06-09" },
      { player: "GaganD", score: 91.2, date: "2026-06-06" },
      { player: "PlayerOne", score: 85.4, date: "2026-06-03" }
    ]
  },
  {
    id: "g3",
    title: "Grid Runner",
    description: "Deconstruct obstacles by shooting packets of debug data at compiling compiler errors.",
    genre: "Shooter / Retro",
    developer: "Gagandeep M",
    rating: 4.6,
    coverUrl: "/images/covers/grid-runner.jpg",
    releaseYear: "2025",
    features: ["Bullet-hell boss battles", "Glitch effects visual filter", "Retro chiptune beats"],
    playable: true,
    highScores: [
      { player: "GaganD", score: 9410, date: "2026-06-09" },
      { player: "Jaxen", score: 9150, date: "2026-06-08" },
      { player: "NullPointer", score: 7890, date: "2026-06-04" }
    ]
  },
  {
    id: "g4",
    title: "Coda: The Last Protocol",
    description: "A visual novel / terminal simulator where your choices compile the fate of an isolated AI server room.",
    genre: "Simulation / Narrative",
    developer: "GDSC Game Dev Team",
    rating: 4.9,
    coverUrl: "/images/covers/coda.jpg",
    releaseYear: "2024",
    features: ["Deep branching story paths", "Realistic terminal emulation command-line", "Interactive hacking sub-games"],
    playable: false,
    highScores: []
  }
];

export const MOCK_TEAM: TeamMember[] = [
  // ── CAMPUS LEAD (featured card) ──
  {
    id: "t-lead-1",
    name: "Gagandeep M",
    role: "Campus Lead",
    subRole: "Engine Core Architect",
    bio: "Engine generalist. Spends late nights optimizing game threads, compiler options, and shaders in Godot and C++.",
    speciality: ["Godot Engine", "C++ Coding", "Shader Writing", "Physics Math"],
    avatarSeed: "gagan",
    department: "TECH",
    isLead: true,
    stats: [
      { label: "TECH", value: 80 },
      { label: "MEDIA_COMP", value: 60 },
      { label: "XREF", value: 50 },
    ],
    gamePreview: { title: "NEON DRIFT", label: "CURRENT PROJECT" },
  },
  // ── CAMPUS CO-LEAD (featured card) ──
  {
    id: "t-lead-2",
    name: "Nidhim Nair",
    role: "Campus Co Lead",
    subRole: "Synth & SFX Composer",
    bio: "Providing the beats that drive the games. Crafts immersive soundscapes, foley sound effects, and synthwave soundtracks.",
    speciality: ["DAW Synth", "Spatial Audio", "Foley Recording", "Ambience"],
    avatarSeed: "nidhim",
    department: "MEDIA",
    isLead: true,
    stats: [
      { label: "DESIGN", value: 90 },
      { label: "MEDIA_COMP", value: 70 },
      { label: "DEEPLINK", value: 80 },
    ],
    gamePreview: { title: "HOLLOW MAZE", label: "CURRENT PROJECT" },
  },

  // ── ROW 1 (member cards) ──
  {
    id: "t1",
    name: "Aswin Binoy",
    role: "Event Lead",
    subRole: "Event Operations & Logistics",
    bio: "Orchestrates all club events from game jams to workshops. Handles venue, schedules, and coordination.",
    speciality: ["Event Management", "Logistics", "Coordination"],
    avatarSeed: "aswin",
    department: "EVENT",
  },
  {
    id: "t2",
    name: "Athul Krishna S",
    role: "Event Co Lead",
    subRole: "Event Outreach & Graphics",
    bio: "Designs the event posters and handles outreach campaigns for all club events and activities.",
    speciality: ["Graphic Design", "Social Media", "Event Outreach"],
    avatarSeed: "athul",
    department: "EVENT",
  },
  {
    id: "t3",
    name: "Akhileswaran K R",
    role: "Tech Lead",
    subRole: "Systems & Web Architect",
    bio: "Builds the technical backbone of Game Forge. Handles infrastructure, deployment, and core backend systems.",
    speciality: ["Web Dev", "System Design", "DevOps", "APIs"],
    avatarSeed: "akhil",
    department: "TECH",
  },
  {
    id: "t4",
    name: "Abhai Sankar P R",
    role: "Tech Co Lead",
    subRole: "Frontend & UI Engineering",
    bio: "Engineers the Game Forge interface. Specializes in pixel-perfect React frontends and interactive animations.",
    speciality: ["React", "Next.js", "TailwindCSS", "UI Engineering"],
    avatarSeed: "abhai",
    department: "TECH",
  },

  // ── ROW 2 ──
  {
    id: "t5",
    name: "Alen Dev P",
    role: "Marketing Lead",
    subRole: "Community Operations & Outreach",
    bio: "Driving the visibility and growth of the Game Dev Collective at SCTCE. Loves strategy games and server logistics.",
    speciality: ["Social Media", "Community Building", "PR Operations"],
    avatarSeed: "alen",
    department: "MARKETING",
  },
  {
    id: "t6",
    name: "Johan Gejo",
    role: "Marketing Co Lead",
    subRole: "Event Graphics & Web Design",
    bio: "Ensures the Game Jams run smoothly and designs promotional posters. Coding game UI in his free time.",
    speciality: ["Event Mgmt", "Graphics Design", "Web Design", "Git Flow"],
    avatarSeed: "johan",
    department: "MARKETING",
  },
  {
    id: "t7",
    name: "Abhirag R Nair",
    role: "Marketing Co Lead",
    subRole: "Content Writer & PR",
    bio: "Penning down the stories and updates for GDSC SCT. Playtests all game submissions and writes detailed feedback.",
    speciality: ["Content Writing", "Game Playtesting", "Public Relations"],
    avatarSeed: "abhirag",
    department: "MARKETING",
  },
  {
    id: "t8",
    name: "Aleena Thomas",
    role: "Design Lead",
    subRole: "UI/UX & Sprite Artist",
    bio: "Creating the visual language of Game Forge. Specializes in dark mode design systems, pixel art, and asset texturing.",
    speciality: ["Figma UI/UX", "Pixel Art", "2D Textures", "Color Theory"],
    avatarSeed: "aleena",
    department: "DESIGN",
  },

  // ── ROW 3 ──
  {
    id: "t9",
    name: "Arjun S M",
    role: "Design Co Lead",
    subRole: "Visual Identity & Assets",
    bio: "Co-crafting the visual identity of Game Dev Club. Expert in illustration, icon sets, and promotional design.",
    speciality: ["Illustration", "Icon Design", "Branding", "Figma"],
    avatarSeed: "arjun",
    department: "DESIGN",
  },
  {
    id: "t10",
    name: "Manas Joby Joseph",
    role: "E-Sports Lead",
    subRole: "Tournament & Competitive Gaming",
    bio: "Runs the e-sports division, organizes competitive gaming events and tracks team rankings across titles.",
    speciality: ["Tournament Ops", "Game Strategy", "Competitive Analysis"],
    avatarSeed: "manas",
    department: "E-SPORTS",
  },
  {
    id: "t11",
    name: "Sanjay K S",
    role: "E-Sports Co Lead",
    subRole: "Team Analyst & Coach",
    bio: "Analyzes opponent strategies and coaches club teams for competitive gaming circuits and tournaments.",
    speciality: ["Game Analysis", "Coaching", "Team Building", "Strategy"],
    avatarSeed: "sanjay",
    department: "E-SPORTS",
  },
  {
    id: "t12",
    name: "Fadi Haris",
    role: "Media Lead",
    subRole: "Photography & Video Production",
    bio: "Capturing the moments that define Game Dev Club. Handles photography, videography and post production.",
    speciality: ["Photography", "Video Editing", "Post Production"],
    avatarSeed: "fadi",
    department: "MEDIA",
  },

  // ── ROW 4 ──
  {
    id: "t13",
    name: "Bhagath Sunand",
    role: "Media Co Lead",
    subRole: "Content Creator & Editor",
    bio: "Creates engaging video content, short reels and club highlight montages for social media channels.",
    speciality: ["Video Content", "Reels", "Content Strategy"],
    avatarSeed: "bhagath",
    department: "MEDIA",
  },
  {
    id: "t14",
    name: "Madhav U Menon",
    role: "Media Co Lead",
    subRole: "Graphic Content & Design",
    bio: "Designs visual content for all club digital platforms including banners, stories, and post graphics.",
    speciality: ["Graphic Design", "Social Media", "Canva", "Figma"],
    avatarSeed: "madhav",
    department: "MEDIA",
  },
  {
    id: "t15",
    name: "Keshav Nair N",
    role: "Community Lead",
    subRole: "Member Relations & Discord",
    bio: "Manages the community server, member onboarding flows, and inter-club collaboration initiatives.",
    speciality: ["Community Ops", "Discord Admin", "Member Relations"],
    avatarSeed: "keshav",
    department: "COMMUNITY",
  },
  {
    id: "t16",
    name: "Bhayana Sunil",
    role: "Media Co Lead",
    subRole: "Social & Branding Content",
    bio: "Builds the brand voice of Game Dev Club through targeted content and consistent creative campaigns.",
    speciality: ["Branding", "Content Writing", "Social Strategy"],
    avatarSeed: "bhayana",
    department: "MEDIA",
  },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, player: "Jaxen", score: 9840, gameTitle: "Neon Drift", date: "2026-06-08" },
  { rank: 2, player: "AleenaT", score: 9680, gameTitle: "Hollow Maze", date: "2026-06-09" },
  { rank: 3, player: "GaganD", score: 9410, gameTitle: "Grid Runner", date: "2026-06-09" },
  { rank: 4, player: "AlenDev", score: 9420, gameTitle: "Neon Drift", date: "2026-06-07" },
  { rank: 5, player: "Jaxen", score: 9150, gameTitle: "Grid Runner", date: "2026-06-08" },
  { rank: 6, player: "CyberGhost", score: 8750, gameTitle: "Neon Drift", date: "2026-06-05" },
  { rank: 7, player: "NullPointer", score: 7890, gameTitle: "Grid Runner", date: "2026-06-04" }
];
