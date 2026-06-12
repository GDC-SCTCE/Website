import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()

const connectionString = `${process.env.DIRECT_URL || process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const data = {
  "quests": [
    {
      "id": "q1",
      "title": "Cyberpunk Level Design",
      "category": "Workshops",
      "status": "ACTIVE",
      "dateText": "May 14-16",
      "location": "Virtual",
      "image": "",
      "capacity": 50,
      "seatsTaken": 12,
      "targetDate": new Date(Date.now() + 12 * 60 * 60 * 1000),
      "attendees": null,
      "rating": null,
      "recapUrl": null,
      "createdAt": new Date()
    },
    {
      "id": "q2",
      "title": "Sound Design Masterclass",
      "category": "Workshops",
      "status": "UPCOMING",
      "dateText": "June 02",
      "location": "Main Hall",
      "image": "",
      "capacity": 30,
      "seatsTaken": 0,
      "targetDate": new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      "attendees": null,
      "rating": null,
      "recapUrl": null,
      "createdAt": new Date()
    },
    {
      "id": "q5",
      "title": "Intro to Game Development",
      "category": "Workshops",
      "status": "UPCOMING",
      "dateText": "June 15",
      "location": "Lab 1",
      "image": "",
      "capacity": 25,
      "seatsTaken": 0,
      "targetDate": new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      "attendees": null,
      "rating": null,
      "recapUrl": null,
      "createdAt": new Date()
    },
    {
      "id": "q3",
      "title": "Game Jam #3 - April 2025",
      "category": "Game Jams",
      "status": "COMPLETED",
      "dateText": "April 2025",
      "location": "Virtual",
      "image": "",
      "capacity": 100,
      "seatsTaken": 100,
      "targetDate": new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      "attendees": 67,
      "rating": 5.0,
      "recapUrl": "#",
      "createdAt": new Date()
    },
    {
      "id": "q4",
      "title": "Unity Workshop - March 2025",
      "category": "Workshops",
      "status": "COMPLETED",
      "dateText": "March 2025",
      "location": "Lab 1",
      "image": "",
      "capacity": 50,
      "seatsTaken": 50,
      "targetDate": new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      "attendees": 41,
      "rating": 4.7,
      "recapUrl": "#",
      "createdAt": new Date()
    },
    {
      "id": "q7",
      "title": "Sound Design Masterclass",
      "category": "Workshops",
      "status": "UPCOMING",
      "dateText": "June 02",
      "location": "Main Hall",
      "image": "",
      "capacity": 30,
      "seatsTaken": 0,
      "targetDate": new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      "attendees": null,
      "rating": null,
      "recapUrl": null,
      "createdAt": new Date()
    },
    {
      "id": "q8",
      "title": "Sound Design Masterclass",
      "category": "Workshops",
      "status": "UPCOMING",
      "dateText": "June 02",
      "location": "Main Hall",
      "image": "",
      "capacity": 30,
      "seatsTaken": 0,
      "targetDate": new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      "attendees": null,
      "rating": null,
      "recapUrl": null,
      "createdAt": new Date()
    },
    {
      "id": "q9",
      "title": "Sound Design Masterclass",
      "category": "Workshops",
      "status": "UPCOMING",
      "dateText": "June 02",
      "location": "Main Hall",
      "image": "",
      "capacity": 30,
      "seatsTaken": 0,
      "targetDate": new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      "attendees": null,
      "rating": null,
      "recapUrl": null,
      "createdAt": new Date()
    },
    {
      "id": "q10",
      "title": "Unity Workshop - March 2025",
      "category": "Workshops",
      "status": "COMPLETED",
      "dateText": "March 2025",
      "location": "Lab 1",
      "image": "",
      "capacity": 50,
      "seatsTaken": 50,
      "targetDate": new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      "attendees": 41,
      "rating": 4.7,
      "recapUrl": "#",
      "createdAt": new Date()
    },
    {
      "id": "q11",
      "title": "Unity Workshop - March 2025",
      "category": "Workshops",
      "status": "COMPLETED",
      "dateText": "March 2025",
      "location": "Lab 1",
      "image": "",
      "capacity": 50,
      "seatsTaken": 50,
      "targetDate": new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      "attendees": 41,
      "rating": 4.7,
      "recapUrl": "#",
      "createdAt": new Date()
    },
    {
      "id": "q12",
      "title": "Unity Workshop - March 2025",
      "category": "Workshops",
      "status": "COMPLETED",
      "dateText": "March 2025",
      "location": "Lab 1",
      "image": "",
      "capacity": 50,
      "seatsTaken": 50,
      "targetDate": new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      "attendees": 41,
      "rating": 4.7,
      "recapUrl": "#",
      "createdAt": new Date()
    },
    {
      "id": "q13",
      "title": "Unity Workshop - March 2025",
      "category": "Workshops",
      "status": "COMPLETED",
      "dateText": "March 2025",
      "location": "Lab 1",
      "image": "",
      "capacity": 50,
      "seatsTaken": 50,
      "targetDate": new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      "attendees": 41,
      "rating": 4.7,
      "recapUrl": "#",
      "createdAt": new Date()
    },
    {
      "id": "q14",
      "title": "Unity Workshop - March 2025",
      "category": "Workshops",
      "status": "COMPLETED",
      "dateText": "March 2025",
      "location": "Lab 1",
      "image": "",
      "capacity": 50,
      "seatsTaken": 50,
      "targetDate": new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      "attendees": 41,
      "rating": 4.7,
      "recapUrl": "#",
      "createdAt": new Date()
    },
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