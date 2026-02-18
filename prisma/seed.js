const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const articlesData = [
  {
  "id": "ARTICLE_001_PYROMANCY",
  "slug": "art-of-pyromancy-winter-edition",
  "title": "The Art of Pyromancy: Fire Starting in Snow",
  "subtitle": "How to summon warmth when the world is frozen.",
  "category": "SKILL_MANUAL",
  "coverImage": "https://images.unsplash.com/photo-1625540405341-80ef62b490cc?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "isPublished": true,
  "createdAt": "2026-02-18T10:00:00Z",
  "updatedAt": "2026-02-18T10:00:00Z",
  "views": 1205,
  "likes": 428,
  "authorInfo": {
    "name": "Kogami Shinya",
    "rank_title": "Platinum Pathfinder",
    "avatar_url": "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  "rpgMetadata": {
    "difficulty_level": "HARD",
    "quest_time_minutes": 10,
    "terrain_type": ["SNOW", "FOREST"],
    "recommended_season": "WINTER",
    "tags": ["Survival", "Bushcraft", "Fire"]
  },
  "contentBody": [
    {
      "type": "TEXT_BLOCK",
      "heading": "The Foundation of Survival",
      "content": "<p>In the frozen wastes, fire is more than warmth—it is your lifeline. When the mercury drops and the wind howls, traditional lighters may fail. You must master the friction and the spark.</p>"
    },
    {
      "type": "WARNING_BLOCK",
      "content": "Alert: Never build your fire directly on deep snow. The melting water will extinguish your hearth before it even begins. Always construct a platform of green wood or stone."
    },
    {
      "type": "IMAGE_BLOCK",
      "url": "https://images.unsplash.com/photo-1610988609460-5b50e6b316b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "caption": "A solid timber platform is essential for insulation from the frozen ground."
    },
    {
      "type": "CHECKLIST_BLOCK",
      "items": [
        "Clear a 2-meter radius of snow.",
        "Prepare a 'raft' of thick, damp logs for the base.",
        "Gather birch bark or fatwood for tinder.",
        "Strike your Ferro Rod at a 45-degree angle."
      ]
    }
  ],
  "linkedProducts": {
    "description": "Essential artifacts to master this pyromancy skill:",
    "items": [
      {
        "product_id": "PROD_013_E_KNF",
        "name": "Morakniv Garberg 'Black Carbon Fang'",
        "reason": "Its carbon steel spine is perfect for throwing massive sparks from a Ferro Rod."
      },
      {
        "product_id": "PROD_009_E_FRR",
        "name": "Pathfinder Magnesium Core Rod",
        "reason": "Reliable ignition source that works even when soaking wet."
      }
    ]
  },
  "location": {
    "region": "Hehuan North Peak",
    "coordinates": {
      "lat": 24.181,
      "lng": 121.281
    },
    "gpx_file_url": null
  }
  },
  {
  "id": "ARTICLE_002_ULTRALIGHT",
  "slug": "the-path-of-the-ghost-ultralight-guide",
  "title": "The Path of the Ghost: Mastering Ultralight",
  "subtitle": "Sacrifice weight, gain freedom. How to optimize your AGI status.",
  "category": "GEAR_REVIEW",
  "coverImage": "https://images.unsplash.com/photo-1545571597-3a20563b55cb?q=80&w=1884&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "isPublished": true,
  "createdAt": "2026-02-18T14:20:00Z",
  "updatedAt": "2026-02-18T14:20:00Z",
  "views": 2580,
  "likes": 892,
  "authorInfo": {
    "name": "Kogami Shinya",
    "rank_title": "Platinum Pathfinder",
    "avatar_url": "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  "rpgMetadata": {
    "difficulty_level": "INTERMEDIATE",
    "quest_time_minutes": 15,
    "terrain_type": ["MOUNTAIN", "TRAIL"],
    "recommended_season": "ALL_SEASONS",
    "tags": ["Ultralight", "Fastpacking", "Agility"]
  },
  "contentBody": [
    {
      "type": "TEXT_BLOCK",
      "heading": "The Weight of the World",
      "content": "<p>In the guild's history, the most efficient rangers are those who move like ghosts. Every gram in your pack is a penalty to your stamina. To master the Path of the Ghost, you must learn the difference between 'needs' and 'wants'.</p>"
    },
    {
      "type": "IMAGE_BLOCK",
      "url": "https://images.unsplash.com/photo-1614638964199-576734e56290?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "caption": "Comparing the base weight of a traditional scout vs. a ghost-style ranger."
    },
    {
      "type": "TEXT_BLOCK",
      "heading": "The Big Three Optimization",
      "content": "<p>Focus your first 'Reforge' on your Shelter, Sleeping System, and Pack. If these three exceed 3kg, you are still bound by heavy chains. Look for DCF fabrics and titanium alloys to break your limits.</p>"
    },
    {
      "type": "CHECKLIST_BLOCK",
      "items": [
        "Cut the tags off your equipment (Every gram counts).",
        "Switch to a frameless backpack for max AGI.",
        "Use a cold-soaking jar instead of a heavy stove system.",
        "Digitize your paper maps into your guild-link device."
      ]
    }
  ],
  "linkedProducts": {
    "description": "Ghost-tier artifacts recommended for this build:",
    "items": [
      {
        "product_id": "PROD_030_E_BOT",
        "name": "Nalgene 'Ghost' Ultralight 1L",
        "reason": "Classic durability with zero unnecessary weight."
      },
      {
        "product_id": "PROD_017_E_BPK",
        "name": "Zpacks Arc Haul Ultra 60L",
        "reason": "The ultimate artifact for those seeking the Ultralight Achievement."
      }
    ]
  },
  "location": {
    "region": "Global Trail Network",
    "coordinates": null,
    "gpx_file_url": null
  }
  },
  {
  "id": "ARTICLE_003_ALTITUDE",
  "slug": "altitude-sickness-prevention-guide",
  "title": "Altitude Sickness: Defying the Curse of Thin Air",
  "subtitle": "How to maintain your status points in high-elevation zones.",
  "category": "SKILL_MANUAL",
  "coverImage": "https://images.unsplash.com/photo-1769882199600-09d13c3c752f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "isPublished": true,
  "createdAt": "2026-02-18T16:45:00Z",
  "updatedAt": "2026-02-18T16:45:00Z",
  "views": 1850,
  "likes": 560,
  "authorInfo": {
    "name": "Kogami Shinya",
    "rank_title": "Platinum Pathfinder",
    "avatar_url": "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  "rpgMetadata": {
    "difficulty_level": "HARD",
    "quest_time_minutes": 12,
    "terrain_type": ["HIGH_ALTITUDE", "MOUNTAIN"],
    "recommended_season": "ALL_SEASONS",
    "tags": ["Safety", "First Aid", "Survival"]
  },
  "contentBody": [
    {
      "type": "TEXT_BLOCK",
      "heading": "The Invisible Debuff",
      "content": "<p>When you cross the 2,500m threshold, the environment begins to drain your HP and Mana. Altitude sickness is not a choice; it is a physiological challenge to your internal systems. Understanding 'Climb High, Sleep Low' is your primary defense spell.</p>"
    },
    {
      "type": "WARNING_BLOCK",
      "content": "Critical Warning: If you experience persistent coughing or severe disorientation, your 'Condition' has reached critical levels (HAPE/HACE). Immediate descent is the only way to clear this status effect."
    },
    {
      "type": "IMAGE_BLOCK",
      "url": "https://images.unsplash.com/photo-1550458393-d4d1b4e2512d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "caption": "The transition from 'Safe Zone' to 'Danger Zone' based on elevation."
    },
    {
      "type": "CHECKLIST_BLOCK",
      "items": [
        "Ascend no more than 300m-500m per day once above 3,000m.",
        "Hydration is key: Drink 3-4 liters of water to maintain blood flow.",
        "Prepare 'Potions': Consult a guild medic for Diamox (Acetazolamide).",
        "Monitor your Oxygen Saturation (SpO2) using a Pulse Oximeter."
      ]
    }
  ],
  "linkedProducts": {
    "description": "Essential gear to monitor and mitigate altitude effects:",
    "items": [
      {
        "product_id": "PROD_045_E_OXM",
        "name": "Pathfinder Pulse Oximeter Mk-II",
        "reason": "Vital for real-time monitoring of your oxygen status levels."
      },
      {
        "product_id": "PROD_011_E_STV",
        "name": "Jetboil Flash 'Alchemist Edition'",
        "reason": "Quickly boils water for hydration and warm teas at low temperatures."
      }
    ]
  },
  "location": {
    "region": "Jade Mountain (Yushan)",
    "coordinates": {
      "lat": 23.470,
      "lng": 120.957
    },
    "gpx_file_url": null
  }
  },
  {
  "id": "ARTICLE_004_HEHUAN",
  "slug": "mt-hehuan-north-beginner-guide",
  "title": "Mt. Hehuan North: The Hero’s Proving Ground",
  "subtitle": "Your first step into the realm of the 3,000-meter peaks.",
  "category": "ROUTE_INTEL",
  "coverImage": "https://images.unsplash.com/photo-1440186347098-386b7459ad6b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "isPublished": true,
  "createdAt": "2026-02-18T20:15:00Z",
  "updatedAt": "2026-02-18T20:15:00Z",
  "views": 3200,
  "likes": 1150,
  "authorInfo": {
    "name": "Kogami Shinya",
    "rank_title": "Platinum Pathfinder",
    "avatar_url": "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  "rpgMetadata": {
    "difficulty_level": "BEGINNER",
    "quest_time_minutes": 240,
    "terrain_type": ["HIGH_ALTITUDE", "GRASSLAND"],
    "recommended_season": "SPRING",
    "tags": ["Hiking", "Taiwan Peaks", "Photography"]
  },
  "contentBody": [
    {
      "type": "TEXT_BLOCK",
      "heading": "The Gateway to the Clouds",
      "content": "<p>Standing at 3,422 meters, Mt. Hehuan North is the highest of the Hehuan range. For a novice adventurer, this is the perfect dungeon to test your stamina and gear before committing to multi-day expeditions. The path is well-worn but the wind is a relentless foe.</p>"
    },
    {
      "type": "IMAGE_BLOCK",
      "url": "https://images.unsplash.com/photo-1607015646132-ee3b6a524ade?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "caption": "The famous Microwave Reflective Plate—a key landmark on your quest."
    },
    {
      "type": "TEXT_BLOCK",
      "heading": "The Trial of the First Kilometer",
      "content": "<p>The initial climb is a steep ascent through rocky stairs. Maintain a steady pace to avoid draining your Stamina Bar too early. Once you pass the 1km mark, the landscape opens up into vast alpine grasslands.</p>"
    },
    {
      "type": "CHECKLIST_BLOCK",
      "items": [
        "Check weather conditions at the Wuling weather station before departure.",
        "Prepare a windproof shell; the ridge is exposed to high-velocity winds.",
        "The round trip takes approximately 3-4 hours for average adventurers.",
        "Don't forget to take a victory photo at the summit marker."
      ]
    }
  ],
  "linkedProducts": {
    "description": "Recommended loadout for this expedition:",
    "items": [
      {
        "product_id": "PROD_005_A_JKT",
        "name": "Arc'teryx Beta AR 'Storm Guard'",
        "reason": "Essential for blocking the fierce winds of the Hehuan ridges."
      },
      {
        "product_id": "PROD_022_E_STK",
        "name": "Black Diamond Alpine Carbon Cork",
        "reason": "Reduces the burden on your knees during the steep descent."
      }
    ]
  },
  "location": {
    "region": "Hehuan Mountain, Nantou",
    "coordinates": {
      "lat": 24.181,
      "lng": 121.281
    },
    "gpx_file_url": "https://cdn.guildsupply.com/routes/hehuan_north_peak.gpx"
  }
  },
  {
  "id": "ARTICLE_005_ALCHEMIST",
  "slug": "field-alchemy-dehydrated-food-tips",
  "title": "Field Alchemy: Secrets of the Dehydrated Feast",
  "subtitle": "Transform dry rations into a gourmet banquet with simple mastery.",
  "category": "LORE",
  "coverImage": "https://images.unsplash.com/photo-1466220549276-aef9ce186540?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "isPublished": true,
  "createdAt": "2026-02-18T22:30:00Z",
  "updatedAt": "2026-02-18T22:30:00Z",
  "views": 2100,
  "likes": 945,
  "authorInfo": {
    "name": "Kogami Shinya",
    "rank_title": "Platinum Pathfinder",
    "avatar_url": "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  "rpgMetadata": {
    "difficulty_level": "BEGINNER",
    "quest_time_minutes": 8,
    "terrain_type": ["CAMP_SITE"],
    "recommended_season": "ALL_SEASONS",
    "tags": ["Cooking", "Nutrition", "Camping"]
  },
  "contentBody": [
    {
      "type": "TEXT_BLOCK",
      "heading": "The Alchemist's Pot",
      "content": "<p>In the guild, we don't just eat for survival; we eat for morale. A well-prepared meal can restore more 'Sanity Points' than any potion. The secret to perfect dehydrated rice lies not in the heat, but in the patience of the transmutation process.</p>"
    },
    {
      "type": "IMAGE_BLOCK",
      "url": "https://images.unsplash.com/photo-1692313532975-513a383c48f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "caption": "Rehydrating at high altitude—remember, water boils at a lower temperature here."
    },
    {
      "type": "WARNING_BLOCK",
      "content": "Recipe Tip: Never rush the 'Steeping' phase. If the scroll says 15 minutes, give it 20. Crunchy rice is a curse no adventurer should endure."
    },
    {
      "type": "CHECKLIST_BLOCK",
      "items": [
        "Shake the bag thoroughly to mix the alchemical powders before adding water.",
        "Add a dash of olive oil or butter to increase your 'Calorie Buffer'.",
        "Use an insulated pouch (Cozy) to keep the heat trapped during the reaction.",
        "Stir once more halfway through to ensure no dry spots remain."
      ]
    }
  ],
  "linkedProducts": {
    "description": "Recommended catalysts for your field kitchen:",
    "items": [
      {
        "product_id": "PROD_088_C_FOOD",
        "name": "Onishi Alpha Rice 'Guardian’s Choice'",
        "reason": "The finest base material for any mountain-side feast."
      },
      {
        "product_id": "PROD_011_E_STV",
        "name": "SOTO WindMaster 'Storm Caller' Stove",
        "reason": "Provides a stable flame even when the wind spirits are angry."
      }
    ]
  },
  "location": {
    "region": "Any Base Camp",
    "coordinates": null,
    "gpx_file_url": null
  }
  },
  {
  "id": "ARTICLE_006_LNT",
  "slug": "lnt-leave-no-trace-guide",
  "title": "Footprint Legacy: The 7 Principles of LNT",
  "subtitle": "How to traverse the realm without leaving a mark on the World Map.",
  "category": "SKILL_MANUAL",
  "coverImage": "https://images.unsplash.com/photo-1713860752281-9bc6ba194346?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "isPublished": true,
  "createdAt": "2026-02-18T23:15:00Z",
  "updatedAt": "2026-02-18T23:15:00Z",
  "views": 1560,
  "likes": 780,
  "authorInfo": {
    "name": "Kogami Shinya",
    "rank_title": "Platinum Pathfinder",
    "avatar_url": "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  "rpgMetadata": {
    "difficulty_level": "BEGINNER",
    "quest_time_minutes": 15,
    "terrain_type": ["WILDERNESS", "FOREST", "MOUNTAIN"],
    "recommended_season": "ALL_SEASONS",
    "tags": ["Conservation", "Ethics", "Outdoor Skills"]
  },
  "contentBody": [
    {
      "type": "TEXT_BLOCK",
      "heading": "The Silent Traveler",
      "content": "<p>A true elite ranger moves through the forest like a shadow. To 'Leave No Trace' is to ensure that the adventurers who follow you experience the same pristine wilderness as you did. It is the ultimate test of your respect for the guild's hunting grounds.</p>"
    },
    {
      "type": "IMAGE_BLOCK",
      "url": "https://images.unsplash.com/photo-1509228890695-35da7abea4f0?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "caption": "Choosing durable surfaces: Camp on stone or gravel to avoid draining the earth's vitality."
    },
    {
      "type": "WARNING_BLOCK",
      "content": "Rule of Origin: Take nothing but memories, leave nothing but footprints. Moving rocks or picking rare herbs depletes the area's mana for everyone else."
    },
    {
      "type": "CHECKLIST_BLOCK",
      "items": [
        "Plan Ahead and Prepare: Study the weather and terrain before you teleport in.",
        "Dispose of Waste Properly: Pack out all 'Cursed Remains' (trash).",
        "Minimize Campfire Impacts: Use a stove instead of building a scar on the land.",
        "Be Considerate of Others: Keep your party's 'Sound Radius' to a minimum."
      ]
    }
  ],
  "linkedProducts": {
    "description": "Essential gear for the low-impact adventurer:",
    "items": [
      {
        "product_id": "PROD_099_E_TCH",
        "name": "The Deuce of Spades #2 'Earth Shield'",
        "reason": "The lightest artifact for burying your organic waste properly."
      },
      {
        "product_id": "PROD_041_E_BAG",
        "name": "Sea to Summit Trash Dry Sack",
        "reason": "Ensures no 'Cursed Odors' leak into your pack while carrying out waste."
      }
    ]
  },
  "location": {
    "region": "Global Wilderness Area",
    "coordinates": null,
    "gpx_file_url": null
  }
  },
  {
  "id": "ARTICLE_007_GORETEX",
  "slug": "gore-tex-maintenance-and-cleaning-guide",
  "title": "The Unyielding Shield: Gore-Tex Maintenance Secrets",
  "subtitle": "How to restore the 'Water Repelling' enchantment on your legendary armor.",
  "category": "GEAR_REVIEW",
  "coverImage": "https://images.unsplash.com/photo-1731877707032-1d94f0fc594a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "isPublished": true,
  "createdAt": "2026-02-19T10:00:00Z",
  "updatedAt": "2026-02-19T10:00:00Z",
  "views": 2890,
  "likes": 1120,
  "authorInfo": {
    "name": "Kogami Shinya",
    "rank_title": "Platinum Pathfinder",
    "avatar_url": "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  "rpgMetadata": {
    "difficulty_level": "INTERMEDIATE",
    "quest_time_minutes": 20,
    "terrain_type": ["WETLAND", "RAINFOREST"],
    "recommended_season": "ALL_SEASONS",
    "tags": ["Gear Care", "Gore-Tex", "Maintenance"]
  },
  "contentBody": [
    {
      "type": "TEXT_BLOCK",
      "heading": "The Fading Magic",
      "content": "<p>Even the strongest 'Frozen Aegis' loses its power when clogged with the oils and dust of a hundred battles. If water no longer beads on your jacket, your DWR (Durable Water Repellent) layer is failing. It's time to return to the Forge for a deep cleanse.</p>"
    },
    {
      "type": "IMAGE_BLOCK",
      "url": "https://images.unsplash.com/photo-1476297587631-7c59d0c57a02?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "caption": "Left: Active DWR (Blessed Status) | Right: Wetting out (Cursed Status)"
    },
    
    {
      "type": "TEXT_BLOCK",
      "heading": "The Rite of Purification",
      "content": "<p>Standard household detergents are too aggressive for these artifacts. Use specialized alchemical cleaners (Technical Washes) that remove grime without damaging the membrane's microscopic pores. After washing, heat is the catalyst that reactivates the water-repellent fibers.</p>"
    },
    {
      "type": "CHECKLIST_BLOCK",
      "items": [
        "Close all zippers and fasten all straps to prevent mechanical damage during the rite.",
        "Use 40°C warm water and a dedicated liquid tech-wash.",
        "Rinse twice to ensure no residue remains in the fabric's pores.",
        "Tumble dry for 20 minutes on medium heat to revive the DWR 'Enchantment'."
      ]
    }
  ],
  "linkedProducts": {
    "description": "Recommended restoration materials:",
    "items": [
      {
        "product_id": "PROD_102_C_WASH",
        "name": "Granger's Performance Wash",
        "reason": "The standard potion for purifying function-wear without side effects."
      },
      {
        "product_id": "PROD_005_A_JKT",
        "name": "Arc'teryx Beta AR",
        "reason": "The legendary shield that benefits most from this maintenance ritual."
      }
    ]
  },
  "location": {
    "region": "The Guild Forge (Laundry Room)",
    "coordinates": null,
    "gpx_file_url": null
  }
  },
  {
  "id": "ARTICLE_008_HEADLAMP",
  "slug": "headlamp-selection-and-lumens-guide",
  "title": "Beacon in the Dark: The Science of Lumens",
  "subtitle": "Pierce through the 'Fog of War' with the right optical artifact.",
  "category": "GEAR_REVIEW",
  "coverImage": "https://images.unsplash.com/photo-1516825295207-81549bdd014c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "isPublished": true,
  "createdAt": "2026-02-19T13:45:00Z",
  "updatedAt": "2026-02-19T13:45:00Z",
  "views": 2150,
  "likes": 670,
  "authorInfo": {
    "name": "Kogami Shinya",
    "rank_title": "Platinum Pathfinder",
    "avatar_url": "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  "rpgMetadata": {
    "difficulty_level": "BEGINNER",
    "quest_time_minutes": 10,
    "terrain_type": ["CAVE", "FOREST", "NIGHT_TRAIL"],
    "recommended_season": "ALL_SEASONS",
    "tags": ["Lighting", "Night Hiking", "Safety Gear"]
  },
  "contentBody": [
    {
      "type": "TEXT_BLOCK",
      "heading": "The Illusion of Light",
      "content": "<p>In the guild's mission logs, many accidents occur during the 'Blue Hour'—the transition between light and shadow. High lumens may seem powerful, but without a proper 'Beam Pattern' (Spread vs. Spot), you are merely blinding yourself and your party members. Mastering your PER attribute starts with controlled illumination.</p>"
    },
    {
      "type": "IMAGE_BLOCK",
      "url": "https://images.unsplash.com/photo-1600201319330-e99245e614c5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "caption": "Spot Beam (long-range scouting) vs. Flood Beam (close-range campsite utility)."
    },
    {
      "type": "WARNING_BLOCK",
      "content": "Tactical Note: Always preserve your natural night vision. Use the 'Red Light' mode when consulting scrolls or checking the map to avoid a sudden PER drop when the light is extinguished."
    },
    {
      "type": "CHECKLIST_BLOCK",
      "items": [
        "Check your 'Mana Reserves' (Battery life): Always carry a spare power cell.",
        "300+ lumens is the minimum requirement for technical night descents.",
        "Look for IPX-rated artifacts to ensure functionality during rain storms.",
        "Reactive Lighting: Choose gear that adjusts brightness based on your gaze distance."
      ]
    }
  ],
  "linkedProducts": {
    "description": "Artifacts to enhance your night-vision perception:",
    "items": [
      {
        "product_id": "PROD_067_E_LMP",
        "name": "Petzl Swift RL 'Eagle Eye'",
        "reason": "Top-tier reactive lighting that automatically optimizes your field of view."
      },
      {
        "product_id": "PROD_033_E_BAT",
        "name": "Nitecore NB10000 Carbon Fiber Bank",
        "reason": "A high-density mana source for recharging your lighting gear in the field."
      }
    ]
  },
  "location": {
    "region": "The Darkened Trails",
    "coordinates": null,
    "gpx_file_url": null
  }
  },
  {
  "id": "ARTICLE_009_STREAM",
  "slug": "stream-crossing-safety-and-techniques",
  "title": "Stream Crossing: Mastering Slippery Terrains",
  "subtitle": "How to navigate unstable aquatic paths without losing your balance.",
  "category": "SKILL_MANUAL",
  "coverImage": "https://images.unsplash.com/photo-1656027104090-0a1f56d33d9d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "isPublished": true,
  "createdAt": "2026-02-19T16:20:00Z",
  "updatedAt": "2026-02-19T16:20:00Z",
  "views": 1920,
  "likes": 540,
  "authorInfo": {
    "name": "Kogami Shinya",
    "rank_title": "Platinum Pathfinder",
    "avatar_url": "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  "rpgMetadata": {
    "difficulty_level": "HARD",
    "quest_time_minutes": 15,
    "terrain_type": ["RIVER", "WETLAND", "VALLEY"],
    "recommended_season": "SUMMER",
    "tags": ["Safety", "River Trekking", "Technique"]
  },
  "contentBody": [
    {
      "type": "TEXT_BLOCK",
      "heading": "The Fluid Battlefield",
      "content": "<p>Running water is a dynamic force that constantly attempts to push you off the World Map. On slippery moss-covered stones, your traction attribute drops by 70%. To survive a crossing, you must transform your body into a tripod, using your trekking poles as additional limbs.</p>"
    },
    {
      "type": "WARNING_BLOCK",
      "content": "Tactical Hazard: Never cross a stream if the water level rises above your 'Stamina Core' (waist). The force of the current increases exponentially with depth. If the water is brown and turbulent, the quest is cancelled—retreat immediately."
    },
    {
      "type": "IMAGE_BLOCK",
      "url": "https://images.unsplash.com/photo-1667056622942-81eb29e91abb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "caption": "The Triangle Method: Face upstream and lean into the current for maximum stability."
    },
    {
      "type": "CHECKLIST_BLOCK",
      "items": [
        "Unbuckle your backpack's waist belt (The 'Quick-Release' maneuver) in case of a fall.",
        "Scan for a 'V-Shape' in the water downstream—it indicates a safe path between obstacles.",
        "Wear 'Water-Type' footwear with felt or specialized rubber soles (Vibram Megagrip).",
        "Maintain three points of contact at all times during movement."
      ]
    }
  ],
  "linkedProducts": {
    "description": "Recommended artifacts for aquatic stability:",
    "items": [
      {
        "product_id": "PROD_055_E_SHS",
        "name": "Hoka Anacapa Mid 'Water Walker'",
        "reason": "Equipped with Megagrip soles to defy the 'Slippery' debuff on wet rocks."
      },
      {
        "product_id": "PROD_022_E_STK",
        "name": "Leki Makalu FX Carbon 'Anchor'",
        "reason": "Provides the essential third and fourth legs needed for high-current stabilization."
      }
    ]
  },
  "location": {
    "region": "Golden Grotto (Jinguashi River)",
    "coordinates": {
      "lat": 25.106,
      "lng": 121.862
    },
    "gpx_file_url": null
  }
  },
  {
  "id": "ARTICLE_010_PACKING",
  "slug": "ultralight-backpack-packing-philosophy",
  "title": "The Final Chapter: Art of the Rucksack",
  "subtitle": "Mastering the gravity of your gear for effortless movement.",
  "category": "SKILL_MANUAL",
  "coverImage": "https://images.unsplash.com/photo-1758640920711-8ad5dbcb5214?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "isPublished": true,
  "createdAt": "2026-02-19T23:00:00Z",
  "updatedAt": "2026-02-19T23:00:00Z",
  "views": 4500,
  "likes": 1820,
  "authorInfo": {
    "name": "Kogami Shinya",
    "rank_title": "Platinum Pathfinder",
    "avatar_url": "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  "rpgMetadata": {
    "difficulty_level": "INTERMEDIATE",
    "quest_time_minutes": 20,
    "terrain_type": ["ALL_TERRAIN"],
    "recommended_season": "ALL_SEASONS",
    "tags": ["Organization", "Backpacking", "Ergonomics"]
  },
  "contentBody": [
    {
      "type": "TEXT_BLOCK",
      "heading": "The Law of Gravity",
      "content": "<p>A poorly packed rucksack is a curse that drains your Stamina Bar with every step. To move with grace, you must align the 'Center of Mass' of your gear with your spine. Heavy items must be kept close to your back, at shoulder-blade level, to prevent the pack from pulling you backward.</p>"
    },
    {
      "type": "IMAGE_BLOCK",
      "url": "https://images.unsplash.com/photo-1596055746427-d5f61aa5df99?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "caption": "The Stratification of Gear: Bottom (Light/Sleep), Middle-Back (Heavy/Food/Water), Top (Essentials)."
    },
    {
      "type": "TEXT_BLOCK",
      "heading": "Systematic Compartmentalization",
      "content": "<p>In the wild, chaos is your enemy. Group your artifacts into 'Dry Sacks' by function: Survival, Medical, Kitchen, and Shelter. This compartmentalization allows you to retrieve any item instantly, even in the middle of a storm or in total darkness.</p>"
    },
    {
      "type": "CHECKLIST_BLOCK",
      "items": [
        "The 'Bottom Layer': Place your sleeping bag and spare clothing here to provide a cushion.",
        "The 'Power Center': Position your heaviest gear (bear canister, water, stove) close to your back.",
        "The 'Quick-Access Vault': Store your headlamp, map, and rain shell in the brain of the pack.",
        "Final Compression: Tighten all straps to ensure the load does not shift during combat with the terrain."
      ]
    }
  ],
  "linkedProducts": {
    "description": "Essential organizational artifacts:",
    "items": [
      {
        "product_id": "PROD_017_E_BPK",
        "name": "Zpacks Arc Haul Ultra 60L",
        "reason": "The ultimate chassis for high-efficiency packing and weight distribution."
      },
      {
        "product_id": "PROD_041_E_BAG",
        "name": "Sea to Summit Ultra-Sil Dry Sack Set",
        "reason": "Color-coded storage modules to keep your inventory organized and dry."
      }
    ]
  },
  "location": {
    "region": "The Adventurer's Home Base",
    "coordinates": null,
    "gpx_file_url": null
  }
  }
];

async function main() {
  console.log('🌱 [系統初始化] 開始搬運物資與發布任務...');
  
  await prisma.article.deleteMany();  

  console.log('✅ 資料庫已清空。');
  
  console.log(`📰 正在出版 ${articlesData.length} 篇冒險指南...`);  

  for (const art of articlesData) {
      try {
        await prisma.article.create({
          data: {
            id: art.id,
            slug: art.slug,
            title: art.title,
            subtitle: art.subtitle,
            category: art.category,
            coverImage: art.coverImage,
            isPublished: art.isPublished,
            views: art.views,
            likes: art.likes,
            
            // JSONB 欄位直接塞入
            authorInfo: art.authorInfo,
            contentBody: art.contentBody,
            rpgMetadata: art.rpgMetadata,
            linkedProducts: art.linkedProducts,
            location: art.location
          }
        });
      } catch (error) {
        console.error(`❌ 出版文章 [${art.title}] 失敗:`, error.message);
      }
    }
  
  console.log('==================================================');
  console.log('🏆 公會圖書館已開放，所有系統運作正常！');
  console.log('==================================================');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });