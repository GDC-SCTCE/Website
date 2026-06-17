import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

const connectionString = `${process.env.DIRECT_URL || process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const data = {
  "quests": [
    {
      "title": "Cyberpunk Level Design",
      "category": "Workshops",
      "status": "ACTIVE",
      "dateText": "May 14-16",
      "location": "Virtual",
      "image": "",
      "capacity": 50,
      "seatsTaken": 12,
      "targetDate": new Date(Date.now() + 12 * 60 * 60 * 1000),

      "recapUrl": null,
    },
    {
      "title": "Sound Design Masterclass",
      "category": "Workshops",
      "status": "UPCOMING",
      "dateText": "June 02",
      "location": "Main Hall",
      "image": "",
      "capacity": 30,
      "seatsTaken": 0,
      "targetDate": new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),

      "recapUrl": null,
    },
    {
      "title": "Intro to Game Development",
      "category": "Workshops",
      "status": "UPCOMING",
      "dateText": "June 15",
      "location": "Lab 1",
      "image": "",
      "capacity": 25,
      "seatsTaken": 0,
      "targetDate": new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),

      "recapUrl": null,
    },
    {
      "title": "Game Jam #3 - April 2025",
      "category": "Game Jams",
      "status": "COMPLETED",
      "dateText": "April 2025",
      "location": "Virtual",
      "image": "",
      "capacity": 100,
      "seatsTaken": 100,
      "targetDate": new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),

      "recapUrl": "#",
    },
    {
      "title": "Unity Workshop - March 2025",
      "category": "Workshops",
      "status": "COMPLETED",
      "dateText": "March 2025",
      "location": "Lab 1",
      "image": "",
      "capacity": 50,
      "seatsTaken": 50,
      "targetDate": new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),

      "recapUrl": "#",
    },
    {
      "title": "Sound Design Masterclass",
      "category": "Workshops",
      "status": "UPCOMING",
      "dateText": "June 02",
      "location": "Main Hall",
      "image": "",
      "capacity": 30,
      "seatsTaken": 0,
      "targetDate": new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),

      "recapUrl": null,
    },
    {
      "title": "Sound Design Masterclass",
      "category": "Workshops",
      "status": "UPCOMING",
      "dateText": "June 02",
      "location": "Main Hall",
      "image": "",
      "capacity": 30,
      "seatsTaken": 0,
      "targetDate": new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),

      "recapUrl": null,
    },
    {
      "title": "Sound Design Masterclass",
      "category": "Workshops",
      "status": "UPCOMING",
      "dateText": "June 02",
      "location": "Main Hall",
      "image": "",
      "capacity": 30,
      "seatsTaken": 0,
      "targetDate": new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),

      "recapUrl": null,
    },
    {
      "title": "Unity Workshop - March 2025",
      "category": "Workshops",
      "status": "COMPLETED",
      "dateText": "March 2025",
      "location": "Lab 1",
      "image": "",
      "capacity": 50,
      "seatsTaken": 50,
      "targetDate": new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),

      "recapUrl": "#",
    },
    {
      "title": "Unity Workshop - March 2025",
      "category": "Workshops",
      "status": "COMPLETED",
      "dateText": "March 2025",
      "location": "Lab 1",
      "image": "",
      "capacity": 50,
      "seatsTaken": 50,
      "targetDate": new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),

      "recapUrl": "#",
    },
    {
      "title": "Unity Workshop - March 2025",
      "category": "Workshops",
      "status": "COMPLETED",
      "dateText": "March 2025",
      "location": "Lab 1",
      "image": "",
      "capacity": 50,
      "seatsTaken": 50,
      "targetDate": new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),

      "recapUrl": "#",
    },
    {
      "title": "Unity Workshop - March 2025",
      "category": "Workshops",
      "status": "COMPLETED",
      "dateText": "March 2025",
      "location": "Lab 1",
      "image": "",
      "capacity": 50,
      "seatsTaken": 50,
      "targetDate": new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),

      "recapUrl": "#",
    },
    {
      "title": "Unity Workshop - March 2025",
      "category": "Workshops",
      "status": "COMPLETED",
      "dateText": "March 2025",
      "location": "Lab 1",
      "image": "",
      "capacity": 50,
      "seatsTaken": 50,
      "targetDate": new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),

      "recapUrl": "#",
    },
  ],
  "games": [
    {
      "title": "Neon Drift",
      "description": "Slide through synthwave grids avoiding firewalls and scanning lasers in this neon arcade runner.",
      "genre": "Arcade / Racing",
      "developer": "Abhirag R Nair & Johan Gejo",
      "engine": "Unity",
      "dimension": "3D",
      "duration": "1h",
      "coverUrl": "/images/covers/neon-drift.jpg",
      "year": "2025",
      "isEditorsChoice": true,
    },
    {
      "title": "Hollow Maze",
      "description": "A dark rogue-lite puzzle explorer where your flashlight is your only defense against creeping glitches.",
      "genre": "Puzzle / Horror",
      "developer": "Aleena Thomas & Nidhim Nair",
      "engine": "Godot",
      "dimension": "2D",
      "duration": "2h",
      "coverUrl": "/images/covers/hollow-maze.jpg",
      "year": "2025",
      "isEditorsChoice": false,
    },
    {
      "title": "Grid Runner",
      "description": "Deconstruct obstacles by shooting packets of debug data at compiling compiler errors.",
      "genre": "Shooter / Retro",
      "developer": "Gagandeep M",
      "engine": "Custom",
      "dimension": "2D",
      "duration": "30m",
      "coverUrl": "/images/covers/grid-runner.jpg",
      "year": "2025",
      "isEditorsChoice": false,
    },
    {
      "title": "Coda: The Last Protocol",
      "description": "A visual novel / terminal simulator where your choices compile the fate of an isolated AI server room.",
      "genre": "Simulation / Narrative",
      "developer": "GDSC Game Dev Team",
      "engine": "Web",
      "dimension": "2D",
      "duration": "4h",
      "coverUrl": "/images/covers/coda.jpg",
      "year": "2024",
      "isEditorsChoice": false,
    }
  ],
  "gameHighScores": [],
  "teamMembers": [
  {
    "name": "Gagandeep M",
    "role": "Campus Lead",
    "avatar": "",
    "department": "ALL",
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
      "title": "NEON DRIFT",
      "image": ""
    }
  },
  {
    "name": "Nidhi M Nair",
    "role": "Campus Co Lead",
    "avatar": "",
    "department": "ALL",
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
      "title": "HOLLOW MAZE",
      "image": ""
    }
  },
  {
    "name": "Aswin Binoy",
    "role": "Event Lead",
    "avatar": "",
    "department": "EVENT",
    "stats": null,
    "gamePreview": null
  },
  {
    "name": "Athul Krishna S",
    "role": "Event Co Lead",
    "avatar": "",
    "department": "EVENT",
    "stats": null,
    "gamePreview": null
  },
  {
    "name": "Akhileswaran K R",
    "role": "Tech Lead",
    "avatar": "",
    "department": "TECH",
    "stats": null,
    "gamePreview": null
  },
  {
    "name": "Abhai Sankar P R",
    "role": "Tech Co Lead",
    "avatar": "",
    "department": "TECH",
    "stats": null,
    "gamePreview": null
  },
  {
    "name": "Alen Dev P",
    "role": "Marketing Lead",
    "avatar": "",
    "department": "MARKETING",
    "stats": null,
    "gamePreview": null
  },
  {
    "name": "Johan Gejo",
    "role": "Marketing Co Lead",
    "avatar": "",
    "department": "MARKETING",
    "stats": null,
    "gamePreview": null
  },
  {
    "name": "Abhirag R Nair",
    "role": "Marketing Co Lead",
    "avatar": "",
    "department": "MARKETING",
    "stats": null,
    "gamePreview": null
  },
  {
    "name": "Aleena Thomas",
    "role": "Design Lead",
    "avatar": "",
    "department": "DESIGN",
    "stats": null,
    "gamePreview": null
  },
  {
    "name": "Arjun S M",
    "role": "Design Co Lead",
    "avatar": "",
    "department": "DESIGN",
    "stats": null,
    "gamePreview": null
  },
  {
    "name": "Manas Joby Joseph",
    "role": "E-Sports Lead",
    "avatar": "",
    "department": "E-SPORTS",
    "stats": null,
    "gamePreview": null
  },
  {
    "name": "Sanjay K S",
    "role": "E-Sports Co Lead",
    "avatar": "",
    "department": "E-SPORTS",
    "stats": null,
    "gamePreview": null
  },
  {
    "name": "Fadi Haris",
    "role": "Media Lead",
    "avatar": "",
    "department": "MEDIA",
    "stats": null,
    "gamePreview": null
  },
  {
    "name": "Bhagath Sunand",
    "role": "Media Co Lead",
    "avatar": "",
    "department": "MEDIA",
    "stats": null,
    "gamePreview": null
  },
  {
    "name": "Madhav U Menon",
    "role": "Media Co Lead",
    "avatar": "",
    "department": "MEDIA",
    "stats": null,
    "gamePreview": null
  },
  {
    "name": "Keshav Nair N",
    "role": "Community Lead",
    "avatar": "",
    "department": "COMMUNITY",
    "stats": null,
    "gamePreview": null
  },
  {
    "name": "Bhavana Sunil",
    "role": "Community Co Lead",
    "avatar": "",
    "department": "COMMUNITY",
    "stats": null,
    "gamePreview": null
  }
],
  "leaderboards": [
    {
      "rank": 1,
      "player": "Jaxen",
      "score": 9840,
      "gameTitle": "Neon Drift",
      "date": "2026-06-08",
    },
    {
      "rank": 2,
      "player": "AleenaT",
      "score": 9680,
      "gameTitle": "Hollow Maze",
      "date": "2026-06-09",
    },
    {
      "rank": 3,
      "player": "GaganD",
      "score": 9410,
      "gameTitle": "Grid Runner",
      "date": "2026-06-09",
    },
    {
      "rank": 4,
      "player": "AlenDev",
      "score": 9420,
      "gameTitle": "Neon Drift",
      "date": "2026-06-07",
    },
    {
      "rank": 5,
      "player": "Jaxen",
      "score": 9150,
      "gameTitle": "Grid Runner",
      "date": "2026-06-08",
    },
    {
      "rank": 6,
      "player": "CyberGhost",
      "score": 8750,
      "gameTitle": "Neon Drift",
      "date": "2026-06-05",
    },
    {
      "rank": 7,
      "player": "NullPointer",
      "score": 7890,
      "gameTitle": "Grid Runner",
      "date": "2026-06-04",
    }
  ]
};

async function main() {
  console.log("Cleaning database...");
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