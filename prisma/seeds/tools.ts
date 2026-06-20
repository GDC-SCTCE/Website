import { ToolCategory, ToolPricing } from "@prisma/client";

export const toolsData = [
  {
    "name": "Unity",
    "category": ToolCategory.ENGINES,
    "rating": 4,
    "pricing": ToolPricing.FREE,
    "platforms": "Win / Mac / Linux",
    "description": "The world's leading platform for creating and operating interactive, real-time 3D content.",
    "url": "https://unity.com",
    "iconUrl": null
  },
  {
    "name": "Godot",
    "category": ToolCategory.ENGINES,
    "rating": 5,
    "pricing": ToolPricing.FREE,
    "platforms": "Win / Mac / Linux",
    "description": "Free and open source 2D and 3D game engine, community-driven and MIT licensed.",
    "url": "https://godotengine.org",
    "iconUrl": null
  },
  {
    "name": "Unreal",
    "category": ToolCategory.ENGINES,
    "rating": 5,
    "pricing": ToolPricing.FREEMIUM,
    "platforms": "Win / Mac",
    "description": "AAA-grade engine with Nanite, Lumen real-time GI, and Blueprint visual scripting.",
    "url": "https://www.unrealengine.com",
    "iconUrl": null
  },
  {
    "name": "Blender",
    "category": ToolCategory.ART,
    "rating": 5,
    "pricing": ToolPricing.FREE,
    "platforms": "Win / Mac / Linux",
    "description": "A complete 3D toolkit for modeling, sculpting, rigging, animation, VFX, and rendering.",
    "url": "https://www.blender.org",
    "iconUrl": null
  },
  {
    "name": "Figma",
    "category": ToolCategory.ART,
    "rating": 4,
    "pricing": ToolPricing.FREEMIUM,
    "platforms": "Web / Win / Mac",
    "description": "Collaborative design and prototyping tool. Perfect for HUD design and game UI mockups.",
    "url": "https://figma.com",
    "iconUrl": null
  }
];
