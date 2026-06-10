import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const data = {
  "quests": [
    {
      "id": "q1",
      "title": "Initialize System",
      "description": "Install Unity, Unreal Engine, or Godot and create a blank project template.",
      "category": "General",
      "difficulty": "Beginner",
      "xpReward": 100,
      "badgeAwarded": "Protocol Initiated",
      "objective": "Create a blank game project and take a screenshot of the editor.",
      "createdAt": "2026-06-10T16:01:12.667Z"
    },
    {
      "id": "q2",
      "title": "C# Scripting Basics",
      "description": "Write a character movement script handling inputs for horizontal and vertical axis.",
      "category": "Code",
      "difficulty": "Beginner",
      "xpReward": 150,
      "badgeAwarded": "Code Cadet",
      "objective": "Implement basic character translation using engine input mappings.",
      "createdAt": "2026-06-10T16:01:13.402Z"
    },
    {
      "id": "q3",
      "title": "Cyberpunk Sprite Sheet",
      "description": "Draw a 4-frame walk cycle sprite sheet for a cyberpunk character (32x32 px).",
      "category": "Design",
      "difficulty": "Intermediate",
      "xpReward": 250,
      "badgeAwarded": "Pixel Pioneer",
      "objective": "Create and export an animated spritesheet with transparent background.",
      "createdAt": "2026-06-10T16:01:14.110Z"
    },
    {
      "id": "q4",
      "title": "Synthesize Laser FX",
      "description": "Create an 8-bit laser firing sound effect using synthesizer software (e.g. sfxr or Audacity).",
      "category": "Sound",
      "difficulty": "Beginner",
      "xpReward": 120,
      "badgeAwarded": "Frequency Wave",
      "objective": "Generate a custom sound effect wav/ogg and import it into your assets folder.",
      "createdAt": "2026-06-10T16:01:14.826Z"
    },
    {
      "id": "q5",
      "title": "A* Pathfinding Node",
      "description": "Program a grid-based A* pathfinding system for enemy AI to hunt the player.",
      "category": "Code",
      "difficulty": "Legendary",
      "xpReward": 500,
      "badgeAwarded": "Pathfinder Master",
      "objective": "Calculate paths dynamically around walls without performance stutters.",
      "createdAt": "2026-06-10T16:01:15.530Z"
    },
    {
      "id": "q6",
      "title": "3D Level Blockout",
      "description": "Design a grey-box layout of a competitive multiplayer arena map emphasizing verticality.",
      "category": "Design",
      "difficulty": "Intermediate",
      "xpReward": 300,
      "badgeAwarded": "Architect Prime",
      "objective": "Create an engaging greybox geometry with cover points and weapon spawns.",
      "createdAt": "2026-06-10T16:01:16.230Z"
    },
    {
      "id": "q7",
      "title": "Dynamic Ambient Mix",
      "description": "Compose a looping synthwave background track (at least 60 seconds) with an intro and outro.",
      "category": "Sound",
      "difficulty": "Legendary",
      "xpReward": 450,
      "badgeAwarded": "Audio Overlord",
      "objective": "Render a high quality audio file looping seamlessly at 120 BPM.",
      "createdAt": "2026-06-10T16:01:16.926Z"
    }
  ],
  "games": [
    {
      "id": "g1",
      "title": "Neon Drift",
      "description": "Slide through synthwave grids avoiding firewalls and scanning lasers in this neon arcade runner.",
      "genre": "Arcade / Racing",
      "developer": "Abhirag R Nair & Johan Gejo",
      "rating": 4.8,
      "coverUrl": "/images/covers/neon-drift.jpg",
      "releaseYear": "2025",
      "features": [],
      "playable": true,
      "createdAt": "2026-06-10T16:01:56.234Z"
    },
    {
      "id": "g2",
      "title": "Hollow Maze",
      "description": "A dark rogue-lite puzzle explorer where your flashlight is your only defense against creeping glitches.",
      "genre": "Puzzle / Horror",
      "developer": "Aleena Thomas & Nidhim Nair",
      "rating": 4.5,
      "coverUrl": "/images/covers/hollow-maze.jpg",
      "releaseYear": "2025",
      "features": [],
      "playable": true,
      "createdAt": "2026-06-10T16:01:57.011Z"
    },
    {
      "id": "g3",
      "title": "Grid Runner",
      "description": "Deconstruct obstacles by shooting packets of debug data at compiling compiler errors.",
      "genre": "Shooter / Retro",
      "developer": "Gagandeep M",
      "rating": 4.6,
      "coverUrl": "/images/covers/grid-runner.jpg",
      "releaseYear": "2025",
      "features": [],
      "playable": true,
      "createdAt": "2026-06-10T16:01:57.726Z"
    },
    {
      "id": "g4",
      "title": "Coda: The Last Protocol",
      "description": "A visual novel / terminal simulator where your choices compile the fate of an isolated AI server room.",
      "genre": "Simulation / Narrative",
      "developer": "GDSC Game Dev Team",
      "rating": 4.9,
      "coverUrl": "/images/covers/coda.jpg",
      "releaseYear": "2024",
      "features": [],
      "playable": false,
      "createdAt": "2026-06-10T16:01:58.412Z"
    }
  ],
  "gameHighScores": [],
  "teamMembers": [
    {
      "id": "t15",
      "name": "Keshav Nair N",
      "role": "Community Lead",
      "speciality": [],
      "avatarSeed": "keshav",
      "department": "COMMUNITY",
      "isLead": false,
      "stats": null,
      "gamePreview": null,
      "createdAt": "2026-06-10T16:03:24.720Z"
    },
    {
      "id": "t14",
      "name": "Madhav U Menon",
      "role": "Media Co Lead",
      "speciality": [],
      "avatarSeed": "madhav",
      "department": "MEDIA",
      "isLead": false,
      "stats": null,
      "gamePreview": null,
      "createdAt": "2026-06-10T16:03:24.058Z"
    },
    {
      "id": "t13",
      "name": "Bhagath Sunand",
      "role": "Media Co Lead",
      "speciality": [],
      "avatarSeed": "bhagath",
      "department": "MEDIA",
      "isLead": false,
      "stats": null,
      "gamePreview": null,
      "createdAt": "2026-06-10T16:03:23.402Z"
    },
    {
      "id": "t16",
      "name": "Bhavana Sunil",
      "role": "Community Co Lead",
      "speciality": [],
      "avatarSeed": "bhayana",
      "department": "COMMUNITY",
      "isLead": false,
      "stats": null,
      "gamePreview": null,
      "createdAt": "2026-06-10T16:03:25.376Z"
    },
    {
      "id": "t12",
      "name": "Fadi Haris",
      "role": "Media Lead",
      "speciality": [],
      "avatarSeed": "fadi",
      "department": "MEDIA",
      "isLead": false,
      "stats": null,
      "gamePreview": null,
      "createdAt": "2026-06-10T16:03:22.731Z"
    },
    {
      "id": "t11",
      "name": "Sanjay K S",
      "role": "E-Sports Co Lead",
      "speciality": [],
      "avatarSeed": "sanjay",
      "department": "E-SPORTS",
      "isLead": false,
      "stats": null,
      "gamePreview": null,
      "createdAt": "2026-06-10T16:03:22.074Z"
    },
    {
      "id": "t10",
      "name": "Manas Joby Joseph",
      "role": "E-Sports Lead",
      "speciality": [],
      "avatarSeed": "manas",
      "department": "E-SPORTS",
      "isLead": false,
      "stats": null,
      "gamePreview": null,
      "createdAt": "2026-06-10T16:03:21.415Z"
    },
    {
      "id": "t9",
      "name": "Arjun S M",
      "role": "Design Co Lead",
      "speciality": [],
      "avatarSeed": "arjun",
      "department": "DESIGN",
      "isLead": false,
      "stats": null,
      "gamePreview": null,
      "createdAt": "2026-06-10T16:03:20.700Z"
    },
    {
      "id": "t8",
      "name": "Aleena Thomas",
      "role": "Design Lead",
      "speciality": [],
      "avatarSeed": "aleena",
      "department": "DESIGN",
      "isLead": false,
      "stats": null,
      "gamePreview": null,
      "createdAt": "2026-06-10T16:03:20.015Z"
    },
    {
      "id": "t7",
      "name": "Abhirag R Nair",
      "role": "Marketing Co Lead",
      "speciality": [],
      "avatarSeed": "abhirag",
      "department": "MARKETING",
      "isLead": false,
      "stats": null,
      "gamePreview": null,
      "createdAt": "2026-06-10T16:03:19.356Z"
    },
    {
      "id": "t6",
      "name": "Johan Gejo",
      "role": "Marketing Co Lead",
      "speciality": [],
      "avatarSeed": "johan",
      "department": "MARKETING",
      "isLead": false,
      "stats": null,
      "gamePreview": null,
      "createdAt": "2026-06-10T16:03:18.691Z"
    },
    {
      "id": "t5",
      "name": "Alen Dev P",
      "role": "Marketing Lead",
      "speciality": [],
      "avatarSeed": "alen",
      "department": "MARKETING",
      "isLead": false,
      "stats": null,
      "gamePreview": null,
      "createdAt": "2026-06-10T16:03:18.034Z"
    },
    {
      "id": "t4",
      "name": "Abhai Sankar P R",
      "role": "Tech Co Lead",
      "speciality": [],
      "avatarSeed": "abhai",
      "department": "TECH",
      "isLead": false,
      "stats": null,
      "gamePreview": null,
      "createdAt": "2026-06-10T16:03:17.375Z"
    },
    {
      "id": "t3",
      "name": "Akhileswaran K R",
      "role": "Tech Lead",
      "speciality": [],
      "avatarSeed": "akhil",
      "department": "TECH",
      "isLead": false,
      "stats": null,
      "gamePreview": null,
      "createdAt": "2026-06-10T16:03:16.701Z"
    },
    {
      "id": "t2",
      "name": "Athul Krishna S",
      "role": "Event Co Lead",
      "speciality": [],
      "avatarSeed": "athul",
      "department": "EVENT",
      "isLead": false,
      "stats": null,
      "gamePreview": null,
      "createdAt": "2026-06-10T16:03:16.042Z"
    },
    {
      "id": "t1",
      "name": "Aswin Binoy",
      "role": "Event Lead",
      "speciality": [],
      "avatarSeed": "aswin",
      "department": "EVENT",
      "isLead": false,
      "stats": null,
      "gamePreview": null,
      "createdAt": "2026-06-10T16:03:15.348Z"
    },
    {
      "id": "t-lead-1",
      "name": "Gagandeep M",
      "role": "Campus Lead",
      "speciality": [
        "Godot Engine",
        "C++ Coding",
        "Shader Writing",
        "Physics Math"
      ],
      "avatarSeed": "https://ansperazeazzjpjmzwtt.supabase.co/storage/v1/object/public/team/gagandeep_m_1781122525995.png",
      "department": "ALL",
      "isLead": true,
      "stats": [
        {
          "label": "TECH",
          "value": 80
        },
        {
          "label": "MEDIA_COMP",
          "value": 60
        },
        {
          "label": "XREF",
          "value": 50
        }
      ],
      "gamePreview": {
        "label": "CURRENT PROJECT",
        "title": "NEON DRIFT"
      },
      "createdAt": "2026-06-10T16:03:13.990Z"
    },
    {
      "id": "t-lead-2",
      "name": "Nidhi M Nair",
      "role": "Campus Co Lead",
      "speciality": [
        "DAW Synth",
        "Spatial Audio",
        "Foley Recording",
        "Ambience"
      ],
      "avatarSeed": "nidhim",
      "department": "ALL",
      "isLead": true,
      "stats": [
        {
          "label": "DESIGN",
          "value": 90
        },
        {
          "label": "MEDIA_COMP",
          "value": 70
        },
        {
          "label": "DEEPLINK",
          "value": 80
        }
      ],
      "gamePreview": {
        "label": "CURRENT PROJECT",
        "title": "HOLLOW MAZE"
      },
      "createdAt": "2026-06-10T16:03:14.657Z"
    }
  ],
  "leaderboards": [
    {
      "id": "c6137a72-d88b-4d73-9020-8d1fd9317e52",
      "rank": 1,
      "player": "Jaxen",
      "score": 9840,
      "gameTitle": "Neon Drift",
      "date": "2026-06-08",
      "createdAt": "2026-06-10T16:28:32.712Z"
    },
    {
      "id": "9d6de385-86b9-48a0-a5b5-dbfff7b2bafe",
      "rank": 2,
      "player": "AleenaT",
      "score": 9680,
      "gameTitle": "Hollow Maze",
      "date": "2026-06-09",
      "createdAt": "2026-06-10T16:28:32.850Z"
    },
    {
      "id": "60a4dccf-87ed-443c-88ac-c482ab0524a3",
      "rank": 3,
      "player": "GaganD",
      "score": 9410,
      "gameTitle": "Grid Runner",
      "date": "2026-06-09",
      "createdAt": "2026-06-10T16:28:32.982Z"
    },
    {
      "id": "b9fcf4aa-ac3e-4ef1-acad-f83fc72d7fa9",
      "rank": 4,
      "player": "AlenDev",
      "score": 9420,
      "gameTitle": "Neon Drift",
      "date": "2026-06-07",
      "createdAt": "2026-06-10T16:28:33.114Z"
    },
    {
      "id": "cd1f5155-a870-4f4b-bbba-185ecf2a76df",
      "rank": 5,
      "player": "Jaxen",
      "score": 9150,
      "gameTitle": "Grid Runner",
      "date": "2026-06-08",
      "createdAt": "2026-06-10T16:28:33.246Z"
    },
    {
      "id": "e67c0c5f-56d2-4c59-a62b-5c40908eb5b1",
      "rank": 6,
      "player": "CyberGhost",
      "score": 8750,
      "gameTitle": "Neon Drift",
      "date": "2026-06-05",
      "createdAt": "2026-06-10T16:28:33.377Z"
    },
    {
      "id": "2eafb3ed-9ff6-44f6-8b4e-d70f564d3dbc",
      "rank": 7,
      "player": "NullPointer",
      "score": 7890,
      "gameTitle": "Grid Runner",
      "date": "2026-06-04",
      "createdAt": "2026-06-10T16:28:33.508Z"
    }
  ]
};

async function main() {
  console.log("Cleaning database...");
  await prisma.gameHighScore.deleteMany();
  await prisma.game.deleteMany();
  await prisma.quest.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.leaderboard.deleteMany();

  console.log("Seeding Quests...");
  for (const item of data.quests) {
    await prisma.quest.create({ data: item });
  }

  console.log("Seeding Games...");
  for (const item of data.games) {
    await prisma.game.create({ data: item });
  }

  console.log("Seeding GameHighScores...");
  for (const item of data.gameHighScores) {
    await prisma.gameHighScore.create({ data: item });
  }

  console.log("Seeding TeamMembers...");
  for (const item of data.teamMembers) {
    await prisma.teamMember.create({ data: item as any });
  }

  console.log("Seeding Leaderboards...");
  for (const item of data.leaderboards) {
    await prisma.leaderboard.create({ data: item });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });